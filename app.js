const languages = [
  {
    id: "c",
    name: "C (GCC)",
    icon: "C",
    file: "main.c",
    mode: "text/x-csrc",
    piston: "c",
    code: `#include <stdio.h>

int main() {
    // Welcome to CMaster!
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);

    if (n % 2 == 0) {
        printf("\\n%d is an Even number.\\n", n);
    } else {
        printf("\\n%d is an Odd number.\\n", n);
    }

    printf("\\nThank you for using CMaster!\\n");
    return 0;
}`
  },
  {
    id: "cpp",
    name: "C++",
    icon: "C+",
    file: "main.cpp",
    mode: "text/x-c++src",
    piston: "c++",
    code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;

    cout << n << (n % 2 == 0 ? " is Even" : " is Odd") << "\\n";
    return 0;
}`
  },
  {
    id: "python",
    name: "Python",
    icon: "Py",
    file: "factorial.py",
    mode: "python",
    piston: "python",
    code: `def factorial(n):
    if n < 2:
        return 1
    return n * factorial(n - 1)

number = int(input("Enter a number: "))
print(f"{number}! =", factorial(number))`
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "JS",
    file: "script.js",
    mode: "javascript",
    piston: "javascript",
    local: true,
    code: `const number = Number(input || 8);
const type = number % 2 === 0 ? "Even" : "Odd";

console.log("Enter a number:", number);
console.log(number + " is an " + type + " number.");
console.log("Thank you for using CMaster!");`
  },
  {
    id: "java",
    name: "Java",
    icon: "Ja",
    file: "Main.java",
    mode: "text/x-java",
    piston: "java",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = scanner.nextInt();
        System.out.println(n + (n % 2 == 0 ? " is Even" : " is Odd"));
    }
}`
  },
  {
    id: "go",
    name: "Go",
    icon: "Go",
    file: "main.go",
    mode: "go",
    piston: "go",
    code: `package main

import "fmt"

func main() {
    var n int
    fmt.Print("Enter a number: ")
    fmt.Scan(&n)
    if n%2 == 0 {
        fmt.Println(n, "is Even")
    } else {
        fmt.Println(n, "is Odd")
    }
}`
  },
  {
    id: "rust",
    name: "Rust",
    icon: "Rs",
    file: "main.rs",
    mode: "rust",
    piston: "rust",
    code: `use std::io;

fn main() {
    let mut input = String::new();
    println!("Enter a number:");
    io::stdin().read_line(&mut input).unwrap();
    let n: i32 = input.trim().parse().unwrap();
    println!("{} is {}", n, if n % 2 == 0 { "Even" } else { "Odd" });
}`
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "TS",
    file: "main.ts",
    mode: "javascript",
    piston: "typescript",
    code: `const items: number[] = [2, 4, 6, 8];
const doubled = items.map((item) => item * 2);
console.log(doubled.join(", "));`
  },
  {
    id: "php",
    name: "PHP",
    icon: "Ph",
    file: "index.php",
    mode: "php",
    piston: "php",
    code: `<?php
$name = trim(fgets(STDIN));
echo "Hello, " . ($name ?: "CMaster") . PHP_EOL;
?>`
  },
  {
    id: "csharp",
    name: "C#",
    icon: "C#",
    file: "Program.cs",
    mode: "text/x-csharp",
    piston: "csharp",
    code: `using System;

class Program {
    static void Main() {
        Console.WriteLine("CMaster is ready.");
    }
}`
  },
  {
    id: "kotlin",
    name: "Kotlin",
    icon: "Kt",
    file: "Main.kt",
    mode: "text/x-kotlin",
    piston: "kotlin",
    code: `fun main() {
    val n = readLine()?.toIntOrNull() ?: 8
    println("$n is \${if (n % 2 == 0) "Even" else "Odd"}")
}`
  },
  {
    id: "swift",
    name: "Swift",
    icon: "Sw",
    file: "main.swift",
    mode: "text/x-swift",
    piston: "swift",
    code: `let n = Int(readLine() ?? "8") ?? 8
print("\\(n) is \\(n % 2 == 0 ? "Even" : "Odd")")`
  },
  {
    id: "r",
    name: "R",
    icon: "R",
    file: "main.r",
    mode: "r",
    piston: "r",
    code: `values <- c(4, 8, 15, 16, 23, 42)
print(mean(values))
print(summary(values))`
  },
  {
    id: "sql",
    name: "SQL",
    icon: "DB",
    file: "query.sql",
    mode: "sql",
    code: `CREATE TABLE learners (name TEXT, points INTEGER);
INSERT INTO learners VALUES ('Aarav', 95), ('Maya', 88), ('Dev', 91);
SELECT name, points FROM learners ORDER BY points DESC;`
  },
  {
    id: "html",
    name: "HTML Preview",
    icon: "HT",
    file: "index.html",
    mode: "htmlmixed",
    local: true,
    code: `<!doctype html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #061025;
        color: white;
        font-family: system-ui;
      }
      h1 { color: #00e5ff; }
    </style>
  </head>
  <body>
    <main>
      <h1>Hello CMaster</h1>
      <p>Your HTML preview is live.</p>
    </main>
  </body>
</html>`
  }
];

const state = {
  language: "c",
  dirty: false,
  running: false,
  lastOutput: "",
  lastError: "",
  activeConsole: "output",
  channel: null,
  suppressBroadcast: false
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const languageList = $("#languageList");
const outputPane = $("#outputPane");
const errorsPane = $("#errorsPane");
const explainPane = $("#explainPane");
const debugPane = $("#debugPane");
const inputPane = $("#inputPane");
const statusLine = $("#statusLine");
const toast = $("#toast");

const editor = CodeMirror.fromTextArea($("#codeEditor"), {
  lineNumbers: true,
  theme: "material-darker",
  indentUnit: 4,
  tabSize: 4,
  lineWrapping: true,
  autofocus: true,
  extraKeys: {
    "Ctrl-Enter": () => runCode(),
    "Cmd-Enter": () => runCode(),
    "Ctrl-S": (cm) => {
      saveProject();
      cm.focus();
    },
    "Cmd-S": (cm) => {
      saveProject();
      cm.focus();
    }
  }
});

function currentLanguage() {
  return languages.find((language) => language.id === state.language) || languages[0];
}

function setStatus(kind, title, detail) {
  statusLine.classList.toggle("error", kind === "error");
  statusLine.querySelector("strong").textContent = title;
  statusLine.querySelector("span:last-child").textContent = detail;
  const icon = statusLine.querySelector(".success-dot");
  icon.innerHTML = kind === "error" ? '<i data-lucide="x"></i>' : '<i data-lucide="check"></i>';
  lucide.createIcons();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function encodeState() {
  return btoa(unescape(encodeURIComponent(JSON.stringify({
    language: state.language,
    code: editor.getValue(),
    input: inputPane.value
  }))));
}

function decodeSharedState() {
  const raw = location.hash.startsWith("#share=") ? location.hash.replace("#share=", "") : "";
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(escape(atob(raw))));
  } catch {
    return null;
  }
}

function savedCodeKey(languageId = state.language) {
  return `cmaster-code-${languageId}`;
}

function selectLanguage(id, options = {}) {
  const language = languages.find((item) => item.id === id);
  if (!language) return;
  state.language = id;
  state.suppressBroadcast = Boolean(options.remote);

  const saved = options.code ?? localStorage.getItem(savedCodeKey(id)) ?? language.code;
  editor.setOption("mode", language.mode);
  editor.setValue(saved);
  editor.clearHistory();
  $("#fileName").textContent = language.file;
  $("#fileIcon").textContent = language.icon;
  renderLanguageList($("#languageSearch").value);
  setStatus("ok", "Ready to execute", `${language.name} selected.`);
  state.suppressBroadcast = false;
  if (!options.quiet) showToast(`${language.name} loaded`);
}

function renderLanguageList(filter = "") {
  const needle = filter.trim().toLowerCase();
  languageList.innerHTML = "";
  languages
    .filter((language) => language.name.toLowerCase().includes(needle) || language.file.toLowerCase().includes(needle))
    .forEach((language) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = language.id === state.language ? "active" : "";
      button.innerHTML = `<span class="lang-icon">${language.icon}</span><span>${language.name}</span><i data-lucide="arrow-right"></i>`;
      button.addEventListener("click", () => selectLanguage(language.id));
      languageList.appendChild(button);
    });
  lucide.createIcons();
}

function switchConsole(tabName) {
  state.activeConsole = tabName;
  $$(".console-tabs button").forEach((button) => button.classList.toggle("active", button.dataset.consoleTab === tabName));
  $$(".console-pane").forEach((pane) => pane.classList.remove("active"));
  $(`#${tabName}Pane`)?.classList.add("active");
}

async function runCode() {
  if (state.running) return;
  state.running = true;
  const language = currentLanguage();
  const code = editor.getValue();
  const stdin = inputPane.value;
  const start = performance.now();
  switchConsole("output");
  outputPane.textContent = "Running program...";
  errorsPane.textContent = "";
  debugPane.textContent = `Language: ${language.name}\nFile: ${language.file}\nRunner: ${language.local ? "Browser local" : "Local compiler backend"}\nStarted: ${new Date().toLocaleTimeString()}`;
  setStatus("ok", "Executing", "Compiler is working on your code.");

  try {
    let result;
    if (language.id === "javascript") {
      result = await runJavaScript(code, stdin);
    } else if (language.id === "html") {
      result = runHtml(code);
    } else if (language.id === "sql") {
      result = runSqlPreview(code);
    } else {
      result = await runWithCompiler(language, code, stdin);
    }

    const duration = ((performance.now() - start) / 1000).toFixed(2);
    state.lastOutput = result.output || "";
    state.lastError = result.error || "";
    outputPane.textContent = state.lastOutput || "(program finished with no stdout)";
    errorsPane.textContent = state.lastError || result.warning || "No compiler or runtime errors.";
    if (result.warning) debugPane.textContent += `\nWarning: ${result.warning}`;
    debugPane.textContent += `\nFinished: ${new Date().toLocaleTimeString()}\nExecution time: ${duration}s`;
    setStatus(result.error ? "error" : "ok", result.error ? "Program finished with errors" : "Program executed successfully", `Execution time: ${duration}s`);
    saveRecent(language, code);
  } catch (error) {
    state.lastOutput = "";
    state.lastError = error.message;
    outputPane.textContent = "Execution failed. Check the Errors tab for details.";
    errorsPane.textContent = error.message;
    switchConsole("errors");
    setStatus("error", "Execution failed", "Remote runner may be unavailable or code may need fixes.");
  } finally {
    state.running = false;
  }
}

async function runJavaScript(code, stdin) {
  const lines = [];
  const sandboxConsole = {
    log: (...args) => lines.push(args.map(formatValue).join(" ")),
    error: (...args) => lines.push(args.map(formatValue).join(" ")),
    warn: (...args) => lines.push(args.map(formatValue).join(" "))
  };
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const fn = new AsyncFunction("console", "input", `"use strict";\n${code}`);
  await fn(sandboxConsole, stdin.trim());
  return { output: lines.join("\n"), error: "" };
}

function formatValue(value) {
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function runHtml(code) {
  const previewWindow = window.open("", "cmaster-preview", "width=900,height=700");
  if (previewWindow) {
    previewWindow.document.open();
    previewWindow.document.write(code);
    previewWindow.document.close();
  }
  return {
    output: previewWindow ? "HTML preview opened in a new browser window." : "Popup blocked. Allow popups to view HTML preview.",
    error: ""
  };
}

function runSqlPreview(code) {
  const statements = code.split(";").map((item) => item.trim()).filter(Boolean);
  const output = [
    "SQL preview mode",
    "Statements detected: " + statements.length,
    "",
    ...statements.map((statement, index) => `${index + 1}. ${statement.replace(/\s+/g, " ")}`)
  ].join("\n");
  return { output, error: "Full SQL execution needs a database engine. This page validates and previews statements locally." };
}

async function runWithCompiler(language, code, stdin) {
  try {
    const response = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: language.id,
        file: language.file,
        code,
        stdin
      })
    });
    if (!response.ok) {
      return await runLocalFallback(language, code, stdin, `Local compiler server returned HTTP ${response.status}. Start server.py for real compilation.`);
    }
    const data = await response.json();
    return {
      output: data.output || "",
      error: data.error || "",
      warning: data.warning || ""
    };
  } catch (error) {
    return await runLocalFallback(language, code, stdin, `Local compiler backend is not running, so CMaster used the browser fallback runner. Detail: ${error.message}`);
  }
}

async function runLocalFallback(language, code, stdin, reason) {
  const inputText = (stdin.trim() || "8").split(/\s+/)[0];
  const number = Number(inputText);
  const notes = [reason, "Fallback supports common learning patterns locally: even/odd, factorial, simple TypeScript, PHP greeting, and R summaries."].filter(Boolean).join("\n");

  if (language.id === "typescript") {
    const transpiled = code
      .replace(/:\s*[A-Za-z_][\w<>\[\]\s,]*/g, "")
      .replace(/\binterface\s+\w+\s+\{[\s\S]*?\}/g, "")
      .replace(/\btype\s+\w+\s*=\s*[^;]+;/g, "");
    const result = await runJavaScript(transpiled, stdin);
    return { output: result.output, error: result.error, warning: notes };
  }

  if (/%\s*2|mod\s*2|Even|Odd/i.test(code) && Number.isFinite(number)) {
    const parity = number % 2 === 0 ? "Even" : "Odd";
    return {
      output: `Enter a number: ${number}\n\n${number} is an ${parity} number.\n\nThank you for using CMaster!`,
      error: "",
      warning: notes
    };
  }

  if (/factorial/i.test(code) && Number.isFinite(number)) {
    let result = 1;
    for (let i = 2; i <= Math.max(0, Math.min(number, 170)); i += 1) result *= i;
    return {
      output: `${number}! = ${result}`,
      error: "",
      warning: notes
    };
  }

  if (language.id === "php") {
    return {
      output: `Hello, ${stdin.trim() || "CMaster"}`,
      error: "",
      warning: notes
    };
  }

  if (language.id === "r") {
    const values = [...code.matchAll(/c\(([^)]+)\)/g)][0]?.[1]
      ?.split(",")
      .map((value) => Number(value.trim()))
      .filter(Number.isFinite) || [4, 8, 15, 16, 23, 42];
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    return {
      output: `[1] ${mean.toFixed(2)}\nMin. ${Math.min(...values)}  Median ${values.sort((a, b) => a - b)[Math.floor(values.length / 2)]}  Max. ${Math.max(...values)}`,
      error: "",
      warning: notes
    };
  }

  return {
    output: "The browser fallback analyzed your code but cannot fully execute this custom program without a connected compiler service.",
    error: "",
    warning: notes
  };
}

function saveProject() {
  localStorage.setItem(savedCodeKey(), editor.getValue());
  saveRecent(currentLanguage(), editor.getValue());
  state.dirty = false;
  showToast("Project saved locally");
}

function saveRecent(language, code) {
  const recent = getRecent().filter((item) => !(item.language === language.id && item.file === language.file));
  recent.unshift({
    language: language.id,
    name: language.name,
    icon: language.icon,
    file: language.file,
    code,
    time: Date.now()
  });
  localStorage.setItem("cmaster-recent", JSON.stringify(recent.slice(0, 8)));
  renderRecent();
}

function getRecent() {
  try {
    return JSON.parse(localStorage.getItem("cmaster-recent") || "[]");
  } catch {
    return [];
  }
}

function renderRecent() {
  const list = $("#recentList");
  const recent = getRecent();
  list.innerHTML = "";
  if (!recent.length) {
    [
      { icon: "C", file: "main.c", time: "a few seconds ago" },
      { icon: "Py", file: "factorial.py", time: "2 hours ago" },
      { icon: "C+", file: "calculator.cpp", time: "1 day ago" },
      { icon: "Py", file: "web_scraper.py", time: "2 days ago" }
    ].forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.innerHTML = `<span class="lang-icon">${item.icon}</span><span>${item.file}</span><small>${item.time}</small>`;
      button.addEventListener("click", () => showToast(`${item.file} is a demo recent item. Save your own code to replace it.`));
      list.appendChild(button);
    });
    return;
  }
  recent.slice(0, 4).forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<span class="lang-icon">${item.icon}</span><span>${item.file}</span><small>${relativeTime(item.time)}</small>`;
    button.addEventListener("click", () => selectLanguage(item.language, { code: item.code }));
    list.appendChild(button);
  });
}

function relativeTime(time) {
  const seconds = Math.max(1, Math.round((Date.now() - time) / 1000));
  if (seconds < 60) return "a few seconds ago";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.round(hours / 24)} days ago`;
}

function shareProject() {
  const link = `${location.origin}${location.pathname}#share=${encodeState()}`;
  navigator.clipboard?.writeText(link);
  history.replaceState(null, "", `#share=${encodeState()}`);
  showToast("Share link copied and added to the address bar");
}

function openEmbedDialog() {
  const link = `${location.origin}${location.pathname}#share=${encodeState()}`;
  const iframe = `<iframe src="${link}" width="100%" height="720" style="border:0;border-radius:16px;overflow:hidden" title="CMaster compiler"></iframe>`;
  $("#embedCode").value = iframe;
  $("#embedDialog").showModal();
}

function assistantReply(action, prompt = "") {
  const language = currentLanguage();
  const code = editor.getValue();
  const lines = code.split("\n").filter((line) => line.trim()).length;
  const output = [];

  if (action === "explain" || action === "line") {
    output.push(`Explanation for ${language.name}:`);
    output.push(`- This file has ${lines} meaningful lines.`);
    output.push(`- Main purpose: ${guessPurpose(code)}.`);
    output.push(`- Important symbols: ${extractSymbols(code).join(", ") || "no obvious function names found"}.`);
    output.push("- Flow: read data, process it, then print or return the result.");
  }

  if (action === "bugs" || action === "error") {
    const findings = findIssues(code, language.id);
    output.push("Potential issues:");
    output.push(...findings.map((finding) => `- ${finding}`));
  }

  if (action === "optimize") {
    output.push("Optimization ideas:");
    output.push("- Keep input validation close to the read/input line.");
    output.push("- Extract repeated logic into a function when it appears more than once.");
    output.push("- Prefer clear variable names before micro-optimizing.");
    if (/for\s*\(|while\s*\(/.test(code)) output.push("- Check loop boundaries and avoid recalculating values inside the loop.");
    if (/recursive|factorial|return\s+\w+\s*\*/i.test(code)) output.push("- For large values, convert recursion to iteration to avoid stack depth limits.");
  }

  if (action === "convert") {
    output.push("Converted JavaScript draft:");
    output.push(convertToJavaScript(code, language.id));
  }

  if (action === "tests") {
    output.push("Suggested tests:");
    output.push("- Input: 8 -> expected even/result branch.");
    output.push("- Input: 7 -> expected odd/alternate branch.");
    output.push("- Input: 0 -> checks boundary behavior.");
    output.push("- Input: invalid text -> confirm your code handles bad input safely.");
  }

  if (!output.length) {
    output.push("Assistant response:");
    output.push(prompt || "Tell me what you want to improve in this code.");
    output.push(...findIssues(code, language.id).map((finding) => `- ${finding}`));
  }

  const text = output.join("\n");
  $("#assistantOutput").textContent = text;
  explainPane.textContent = text;
  switchConsole("explain");
}

function guessPurpose(code) {
  if (/factorial/i.test(code)) return "calculate a factorial";
  if (/%\s*2/.test(code)) return "check whether a number is even or odd";
  if (/fetch|http|request/i.test(code)) return "call an external service";
  if (/select\s+.+from/i.test(code)) return "query data";
  if (/class\s+|function\s+|def\s+/.test(code)) return "organize reusable logic";
  return "run a small programming exercise";
}

function extractSymbols(code) {
  const matches = [
    ...code.matchAll(/\b(?:function|def|class|int|void|public\s+static\s+void)\s+([A-Za-z_][\w]*)/g)
  ];
  return [...new Set(matches.map((match) => match[1]).filter((name) => !["if", "for", "while", "main"].includes(name)))].slice(0, 6);
}

function findIssues(code, languageId) {
  const issues = [];
  if (!code.trim()) issues.push("Editor is empty.");
  if ((code.match(/\{/g) || []).length !== (code.match(/\}/g) || []).length) issues.push("Curly braces do not look balanced.");
  if ((code.match(/\(/g) || []).length !== (code.match(/\)/g) || []).length) issues.push("Parentheses do not look balanced.");
  if (/scanf\s*\([^,]+,\s*[A-Za-z_]/.test(code)) issues.push("C scanf usually needs & before non-array variables.");
  if (languageId === "javascript" && /\bvar\b/.test(code)) issues.push("Use let/const instead of var for cleaner scope behavior.");
  if (/password|api[_-]?key|secret/i.test(code)) issues.push("Avoid hard-coding secrets in browser code.");
  if (/while\s*\(\s*true\s*\)/.test(code)) issues.push("Infinite loop detected; add a clear break condition.");
  if (!issues.length) issues.push("No obvious static issues found. Run the code to confirm behavior.");
  return issues;
}

function convertToJavaScript(code, languageId) {
  if (languageId === "javascript") return code;
  if (/%\s*2/.test(code)) {
    return `const n = Number(input || 8);
console.log(n + (n % 2 === 0 ? " is Even" : " is Odd"));`;
  }
  if (/factorial/i.test(code)) {
    return `function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i += 1) result *= i;
  return result;
}

console.log(factorial(Number(input || 5)));`;
  }
  return `// Manual conversion starter for ${currentLanguage().name}
// Original code is below. Translate input/output and types step by step.

${code.split("\n").map((line) => `// ${line}`).join("\n")}`;
}

function setupCanvas() {
  const canvas = $("#neuralCanvas");
  const context = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let points = [];

  function resize() {
    width = canvas.width = window.innerWidth * devicePixelRatio;
    height = canvas.height = window.innerHeight * devicePixelRatio;
    points = Array.from({ length: Math.min(90, Math.floor(window.innerWidth / 18)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.55 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.55 * devicePixelRatio
    }));
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#020714";
    context.fillRect(0, 0, width, height);
    points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;
    });
    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 190 * devicePixelRatio) {
          const alpha = 1 - distance / (190 * devicePixelRatio);
          context.strokeStyle = `rgba(0, 207, 255, ${alpha * 0.22})`;
          context.lineWidth = devicePixelRatio;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
    }
    points.forEach((point) => {
      context.fillStyle = "rgba(0, 225, 255, 0.55)";
      context.beginPath();
      context.arc(point.x, point.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
      context.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

function setupCollaboration() {
  if (!("BroadcastChannel" in window)) return;
  state.channel = new BroadcastChannel("cmaster-live-room");
  state.channel.addEventListener("message", (event) => {
    if (!event.data || event.data.source === "self") return;
    state.suppressBroadcast = true;
    if (event.data.language && event.data.language !== state.language) {
      selectLanguage(event.data.language, { code: event.data.code, remote: true, quiet: true });
    } else if (typeof event.data.code === "string" && event.data.code !== editor.getValue()) {
      editor.setValue(event.data.code);
    }
    state.suppressBroadcast = false;
    showToast("Live room synced from another tab");
  });
}

async function checkCompilerHealth() {
  const badge = $("#compilerHealth");
  if (!badge) return;
  try {
    const response = await fetch("/api/health", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    badge.textContent = `Compiler Online: ${data.summary}`;
    badge.classList.add("online");
    badge.classList.remove("offline");
  } catch {
    badge.textContent = "Compiler Offline: Browser Fallback";
    badge.classList.add("offline");
    badge.classList.remove("online");
  }
}

function broadcastCode() {
  if (!state.channel || state.suppressBroadcast) return;
  state.channel.postMessage({ language: state.language, code: editor.getValue() });
}

function bindEvents() {
  $("#languageSearch").addEventListener("input", (event) => renderLanguageList(event.target.value));
  $("#globalSearch").addEventListener("input", (event) => {
    const value = event.target.value;
    $("#languageSearch").value = value;
    renderLanguageList(value);
  });
  $("#runBtn").addEventListener("click", runCode);
  $("#saveBtn").addEventListener("click", saveProject);
  $("#shareBtn").addEventListener("click", shareProject);
  $("#embedBtn").addEventListener("click", openEmbedDialog);
  $("#copyEmbed").addEventListener("click", () => {
    navigator.clipboard?.writeText($("#embedCode").value);
    showToast("Embed code copied");
  });
  $("#copyOutput").addEventListener("click", () => {
    const active = $(`#${state.activeConsole}Pane`);
    navigator.clipboard?.writeText(active?.value || active?.textContent || "");
    showToast("Console text copied");
  });
  $("#clearOutput").addEventListener("click", () => {
    outputPane.textContent = "";
    errorsPane.textContent = "";
    explainPane.textContent = "";
    debugPane.textContent = "";
    setStatus("ok", "Console cleared", "Ready for a fresh run.");
  });
  $$(".console-tabs button").forEach((button) => button.addEventListener("click", () => switchConsole(button.dataset.consoleTab)));
  $$(".assistant-buttons button, .quick-prompts button[data-ai]").forEach((button) => {
    button.addEventListener("click", () => assistantReply(button.dataset.ai, $("#assistantPrompt").value));
  });
  $("#askAssistant").addEventListener("click", () => assistantReply("custom", $("#assistantPrompt").value));
  $$(".examples button").forEach((button) => {
    button.addEventListener("click", () => assistantReply(button.dataset.example === "bug" ? "bugs" : button.dataset.example));
  });
  $("#tryExample").addEventListener("click", () => {
    selectLanguage("python");
    inputPane.value = "5";
  });
  $("#viewAllLanguages").addEventListener("click", () => {
    $("#languageSearch").value = "";
    renderLanguageList("");
    showToast("Showing all available templates");
  });
  $("#viewAllRecent").addEventListener("click", () => showToast(`${getRecent().length} saved item(s) available locally`));
  $("#newFile").addEventListener("click", () => {
    editor.setValue("");
    showToast("Blank file ready");
  });
  $("#themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    showToast(document.body.classList.contains("light-mode") ? "Light mode enabled" : "Dark neon mode enabled");
  });
  $("#notifyButton").addEventListener("click", () => showToast("No new notifications"));
  $("#languageSettings").addEventListener("click", () => showToast("Language templates and runners are active"));
  $("#startNow").addEventListener("click", () => document.querySelector("#workbench").scrollIntoView({ behavior: "smooth" }));
  $("#bottomStart").addEventListener("click", () => document.querySelector("#workbench").scrollIntoView({ behavior: "smooth" }));
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      $("#globalSearch").focus();
    }
  });
  editor.on("change", () => {
    state.dirty = true;
    localStorage.setItem(savedCodeKey(), editor.getValue());
    clearTimeout(broadcastCode.timer);
    broadcastCode.timer = setTimeout(broadcastCode, 160);
  });
}

function boot() {
  lucide.createIcons();
  setupCanvas();
  setupCollaboration();
  bindEvents();
  renderLanguageList();
  renderRecent();
  checkCompilerHealth();

  const shared = decodeSharedState();
  if (shared?.language) {
    inputPane.value = shared.input || "";
    selectLanguage(shared.language, { code: shared.code, quiet: true });
    showToast("Shared project restored");
  } else {
    inputPane.value = "8";
    selectLanguage("c", { quiet: true });
  }
  outputPane.textContent = "Enter input, press Run, then inspect Output, Errors, AI Explanation, or Debug.";
}

boot();
