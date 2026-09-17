from __future__ import annotations

import json
import os
import shutil
import subprocess
import tempfile
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
TIMEOUT_SECONDS = 8


class CMasterHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def do_POST(self):
        if self.path != "/api/run":
            self.send_error(404, "Not found")
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            result = run_code(payload)
            self.respond_json(200, result)
        except Exception as exc:  # Keep backend failures visible in the UI.
            self.respond_json(500, {"output": "", "error": str(exc), "warning": ""})

    def do_GET(self):
        if self.path == "/api/health":
            self.respond_json(200, compiler_health())
            return
        super().do_GET()

    def respond_json(self, status: int, data: dict):
        encoded = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)


def run_code(payload: dict) -> dict:
    language = str(payload.get("language", "")).lower()
    code = str(payload.get("code", ""))
    stdin = str(payload.get("stdin", ""))
    file_name = safe_file_name(str(payload.get("file", "main.txt")))

    with tempfile.TemporaryDirectory(prefix="cmaster-run-") as tmp:
        workdir = Path(tmp)
        source = workdir / file_name
        source.write_text(code, encoding="utf-8")

        if language == "c":
            return compile_and_run(["gcc", str(source), "-O2", "-std=c11", "-o", str(workdir / "main.exe")], [str(workdir / "main.exe")], stdin, workdir)
        if language == "cpp":
            return compile_and_run(["g++", str(source), "-O2", "-std=c++17", "-o", str(workdir / "main.exe")], [str(workdir / "main.exe")], stdin, workdir)
        if language == "python":
            return run_process(["python", str(source)], stdin, workdir)
        if language == "javascript":
            return run_process(["node", str(source)], stdin, workdir)
        if language == "java":
            java_file = workdir / "Main.java"
            if source != java_file:
                java_file.write_text(code, encoding="utf-8")
            compiled = run_process(["javac", str(java_file)], "", workdir)
            if compiled["error"]:
                return compiled
            return run_process(["java", "-cp", str(workdir), "Main"], stdin, workdir)
        if language == "typescript":
            js_code = strip_typescript(code)
            js_file = workdir / "main.js"
            js_file.write_text(js_code, encoding="utf-8")
            result = run_process(["node", str(js_file)], stdin, workdir)
            result["warning"] = join_warning(result.get("warning", ""), "TypeScript was transpiled with a lightweight browser-style stripper.")
            return result

        installed = shutil.which(language)
        if installed:
            return run_process([installed, str(source)], stdin, workdir)

        return {
            "output": "",
            "error": f"{language or 'This language'} compiler is not installed on this computer.",
            "warning": "Install the compiler or switch to C, C++, Python, JavaScript, Java, or TypeScript."
        }


def compiler_health() -> dict:
    commands = {
        "c": "gcc",
        "cpp": "g++",
        "python": "python",
        "javascript": "node",
        "java": "javac",
    }
    available = {name: bool(shutil.which(command)) for name, command in commands.items()}
    return {
        "online": True,
        "available": available,
        "summary": ", ".join(name.upper() for name, ok in available.items() if ok) or "No compilers found"
    }


def compile_and_run(compile_cmd: list[str], run_cmd: list[str], stdin: str, cwd: Path) -> dict:
    compiled = run_process(compile_cmd, "", cwd)
    if compiled["error"]:
        return {
            "output": compiled["output"],
            "error": compiled["error"],
            "warning": "Compilation failed. Fix the code and run again."
        }
    executed = run_process(run_cmd, stdin, cwd)
    if compiled["output"]:
        executed["output"] = compiled["output"] + ("\n" if executed["output"] else "") + executed["output"]
    return executed


def run_process(cmd: list[str], stdin: str, cwd: Path) -> dict:
    if not shutil.which(cmd[0]) and not Path(cmd[0]).exists():
        return {"output": "", "error": f"Command not found: {cmd[0]}", "warning": ""}

    try:
        completed = subprocess.run(
            cmd,
            input=stdin,
            text=True,
            capture_output=True,
            cwd=str(cwd),
            timeout=TIMEOUT_SECONDS,
            env=safe_env(),
        )
    except subprocess.TimeoutExpired as exc:
        return {
            "output": exc.stdout or "",
            "error": f"Program timed out after {TIMEOUT_SECONDS} seconds.",
            "warning": ""
        }

    return {
        "output": completed.stdout or "",
        "error": completed.stderr or (f"Process exited with code {completed.returncode}." if completed.returncode else ""),
        "warning": ""
    }


def safe_env() -> dict[str, str]:
    env = os.environ.copy()
    env["PYTHONIOENCODING"] = "utf-8"
    env["CMaster"] = "local"
    return env


def safe_file_name(name: str) -> str:
    cleaned = Path(name).name.strip() or "main.txt"
    return cleaned.replace("/", "_").replace("\\", "_")


def strip_typescript(code: str) -> str:
    import re

    stripped = re.sub(r":\s*[A-Za-z_][\w<>\[\]\s,|&?]*(?=[=,;)])", "", code)
    stripped = re.sub(r"\binterface\s+\w+\s*\{[^}]*\}", "", stripped, flags=re.S)
    stripped = re.sub(r"\btype\s+\w+\s*=\s*[^;]+;", "", stripped)
    return stripped


def join_warning(left: str, right: str) -> str:
    return "\n".join(item for item in [left, right] if item)


if __name__ == "__main__":
    port = int(os.environ.get("CMASTER_PORT", "8087"))
    server = ThreadingHTTPServer(("127.0.0.1", port), CMasterHandler)
    print(f"CMaster compiler server running at http://127.0.0.1:{port}")
    server.serve_forever()
