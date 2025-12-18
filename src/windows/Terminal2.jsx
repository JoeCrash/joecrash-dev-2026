import { useEffect, useMemo, useRef, useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import useTerminalStore from "#store/terminal.js";
import { API_BASE, TERMINAL_CMD, TERMINAL_HEX_PREFIX } from "#constants/index.js";

const PROMPT = "guest@joecrash-dev ~ %";

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeHex(h) {
  // Accept 3, 4, 6, 8 hex digits (with optional alpha). Return with leading '#'.
  const hex = h.toLowerCase();
  if (hex.length === 3) {
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  if (hex.length === 4) {
    // #RGBA -> #RRGGBBAA
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  if (hex.length === 6 || hex.length === 8) {
    return `#${hex}`;
  }
  return null;
}

function parseColoredText(text, prefix) {
  const parts = [];
  const esc = escapeRegExp(prefix);
  const regex = new RegExp(`${esc}#([0-9a-fA-F]{3,8})`, "g");
  let lastIndex = 0;
  let currentColor = "#ffffff";
  let hasToken = false;
  let match;
  while ((match = regex.exec(text)) !== null) {
    hasToken = true;
    const start = match.index;
    const before = text.slice(lastIndex, start);
    if (before) {
      parts.push({ text: before, color: currentColor });
    }
    const raw = match[1];
    const norm = normalizeHex(raw);
    if (norm) {
      currentColor = norm;
    }
    lastIndex = regex.lastIndex;
  }
  const tail = text.slice(lastIndex);
  if (tail) {
    parts.push({ text: tail, color: currentColor });
  }
  return { parts, hasToken };
}

const Terminal2 = () => {
  const { history, addEntry, clearHistory } = useTerminalStore();
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(null); // null = not browsing, otherwise index into commandHistory
  const [draftInput, setDraftInput] = useState(""); // remembers the input before starting to browse history
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Build a list of previously executed commands (most recent first)
  const commandHistory = useMemo(() => {
    const cmds = history
      .map((h) => h.command)
      .filter((c) => typeof c === "string" && c.trim().length > 0);
    if (cmds.length === 0) return [];
    // Remove consecutive duplicates for nicer UX
    const dedup = [];
    for (let i = 0; i < cmds.length; i++) {
      const c = cmds[i];
      if (i === 0 || c !== cmds[i - 1]) dedup.push(c);
    }
    return dedup.reverse(); // most recent first
  }, [history]);

  const commands = useMemo(() => TERMINAL_CMD, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (commandHistory.length === 0) return; // nothing to browse
      e.preventDefault();

      if (e.key === "ArrowUp") {
        // Move to older commands (increase index)
        if (historyIndex === null) {
          // start browsing; remember current input
          setDraftInput(input);
          setHistoryIndex(0);
          setInput(commandHistory[0] ?? "");
        } else {
          const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex] ?? "");
        }
      } else if (e.key === "ArrowDown") {
        if (historyIndex === null) {
          // not browsing; nothing to do
          return;
        }
        const nextIndex = historyIndex - 1;
        if (nextIndex < 0) {
          // back to draft input and exit browsing mode
          setHistoryIndex(null);
          setInput(draftInput);
        } else {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex] ?? "");
        }
      }
    }
  };

  const runFrontend = async (key) => {
    switch (key) {
      case "clear":
        clearHistory();
        // Reset input browsing state on clear
        setHistoryIndex(null);
        setDraftInput("");
        setInput("");
        return;
      case "helloUI":
        addEntry({ command: "helloUI", output: "Hello from the UI 👋", type: "success" });
        return;
      default:
        addEntry({ command: key, output: `No frontend handler for ${key}`, type: "error" });
    }
  };

  const runBackend = async (endpoint, sentCommand) => {
    try {
      const url = `${API_BASE}${endpoint}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      addEntry({ command: sentCommand, output: data.message || JSON.stringify(data), type: "success" });
    } catch (e) {
      addEntry({ command: sentCommand, output: `API error: ${e.message}`, type: "error" });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    // find matching command
    const entry = Object.values(commands).find((c) => c.command === cmd);

    if (!entry) {
      addEntry({ command: cmd, output: `Command not found: ${cmd}`, type: "error" });
      setInput("");
      setHistoryIndex(null);
      setDraftInput("");
      return;
    }

    // frontend handler
    if (entry.function) {
      runFrontend(entry.function);
    }

    // backend handler
    if (entry.endpoint) {
      runBackend(entry.endpoint, entry.command);
    }

    // show help if both are missing
    if (!entry.function && !entry.endpoint) {
      addEntry({ command: cmd, output: entry.help || "No action configured.", type: "info" });
    }

    setInput("");
    setHistoryIndex(null);
    setDraftInput("");
  };

  return (
    <>
      <div id="window-header">
        <h2>Terminal</h2>
        <WindowControls target="terminal" />
      </div>
      <div className="bg-gray-900 text-white font-mono text-sm p-3 h-[420px] overflow-hidden">
        <div ref={outputRef} className="h-[360px] overflow-y-auto pr-2 custom-scrollbar">
          {history.length === 0 && (
            <div className="text-gray-400 mb-2">
              Type "helloUI" or "helloAPI". Use "clear" to clear the screen.
            </div>
          )}
          {history.map((row) => {
            const { parts, hasToken } = row.output
              ? parseColoredText(String(row.output), TERMINAL_HEX_PREFIX)
              : { parts: [], hasToken: false };
            return (
              <div key={row.id} className="whitespace-pre-wrap">
                <span className="text-green-500 mr-2">{PROMPT}</span>
                <span className="text-white">{row.command}</span>
                {row.output && (
                  <div className={hasToken ? "" : "text-white"}>
                    {hasToken
                      ? parts.map((p, i) => (
                          <span key={i} style={{ color: p.color }}>{p.text}</span>
                        ))
                      : row.output}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-green-500">{PROMPT}</span>
          <input
            autoFocus
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // If user types while browsing, exit browsing mode and update draft
              if (historyIndex !== null) {
                setHistoryIndex(null);
              }
              setDraftInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none placeholder:text-gray-500"
            placeholder="Enter a command"
          />
        </form>
      </div>
    </>
  );
};

const Terminal2Window = WindowWrapper(Terminal2, "terminal");
export default Terminal2Window;
