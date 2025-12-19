import { useEffect, useMemo, useRef, useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import useTerminalStore from "#store/terminal.js";
import useWindowStore from "#store/window.js";
import { API_BASE, TERMINAL_CMD, TERMINAL_HEX_PREFIX, TERMINAL_HEX_SUFFIX } from "#constants/index.js";

const PROMPT = "guest@joecrash-dev ~ %";

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseColoredText(text, prefix, suffix) {
  const parts = [];
  const escPrefix = escapeRegExp(prefix);
  const escSuffix = escapeRegExp(suffix);
  // Accept only exact tokens like ^#RRGGBB^
  const regex = new RegExp(`${escPrefix}#([0-9a-fA-F]{6})${escSuffix}`, "g");
  let lastIndex = 0;
  let currentColor = "#ffffff";
  let hasToken = false;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    const before = text.slice(lastIndex, start);
    if (before) {
      parts.push({ text: before, color: currentColor });
    }
    hasToken = true;
    const hex = match[1].toLowerCase();
    currentColor = `#${hex}`;
    lastIndex = regex.lastIndex;
  }
  const tail = text.slice(lastIndex);
  if (tail) {
    parts.push({ text: tail, color: currentColor });
  }
  return { parts, hasToken };
}

const Terminal2 = () => {
  const { history, commands, addEntry, clearHistory } = useTerminalStore();
  const { closeWindow } = useWindowStore();
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(null); // null = not browsing, otherwise index into commandHistory
  const [draftInput, setDraftInput] = useState(""); // remembers the input before starting to browse history
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  // Defer input focusing to the bubbling phase and next frame to avoid clobbering by window focus re-render
  const focusInputAfterWindowFocus = () => {
    // Use rAF to run after WindowWrapper's onPointerDownCapture triggers focusWindow and any ensuing render
    requestAnimationFrame(() => {
      if (inputRef.current) {
        try {
          inputRef.current.focus({ preventScroll: true });
        } catch (_) {
          // fallback for older browsers
          inputRef.current.focus();
        }
      }
    });
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Build a list of previously executed commandRegistry (most recent first)
  const commandHistory = useMemo(() => {
    if (!commands || commands.length === 0) return [];
    // Iterate from newest to oldest, removing consecutive duplicates
    const result = [];
    for (let i = commands.length - 1; i >= 0; i--) {
      const c = commands[i];
      if (typeof c !== "string" || c.trim().length === 0) continue;
      if (result.length === 0 || result[result.length - 1] !== c) {
        result.push(c);
      }
    }
    return result; // most recent first
  }, [commands]);

  const commandRegistry = useMemo(() => TERMINAL_CMD, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (commandHistory.length === 0) return; // nothing to browse
      e.preventDefault();

      if (e.key === "ArrowUp") {
        // Move to older commandRegistry (increase index)
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
      case "exit":
        // Close the terminal window immediately
        closeWindow("terminal");
        // Do not add any history entry; silently close
        return;
      case "helloUI":
        addEntry({ command: "helloUI", output: "Hello from the ^#FEDF00^UI 👋", type: "success" });
        return;
      case "help": {
        // Build a two-color help list using hex prefix/suffix tokens (^#RRGGBB^)
        const primary = "#65eeab"; // command color (greenish)
        const secondary = "#b3b3b3"; // description color (light gray)
        const lines = Object.values(TERMINAL_CMD)
          .map((c) => `${TERMINAL_HEX_PREFIX}${primary}${TERMINAL_HEX_SUFFIX}${c.command} ${TERMINAL_HEX_PREFIX}${secondary}${TERMINAL_HEX_SUFFIX}${c.help || ""}`)
          .join("\n");
        addEntry({ command: "help", output: lines, type: "info" });
        return;
      }
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

    // find matching command (case-insensitive)
    const cmdLower = cmd.toLowerCase();
    const entry = Object.values(commandRegistry).find((c) => String(c.command).toLowerCase() === cmdLower);

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
      <div
        className="bg-gray-900 text-white font-mono text-sm p-3 h-[420px] overflow-hidden"
        onPointerDown={() => {
          // Focus after window focus (bubbling), next frame
          focusInputAfterWindowFocus();
        }}
      >
        <div
          ref={outputRef}
          className="h-[360px] overflow-y-auto pr-2 custom-scrollbar"
          onPointerDown={() => {
            // Also focus when clicking inside the scrollable area, after window focus
            focusInputAfterWindowFocus();
          }}
        >
          {history.length === 0 && (
            <div className="text-gray-400 mb-2">
              Type "helloUI", "helloAPI", or "help". Use "clear" to clear the screen.
            </div>
          )}
          {history.map((row) => {
            const { parts, hasToken } = row.output
              ? parseColoredText(String(row.output), TERMINAL_HEX_PREFIX, TERMINAL_HEX_SUFFIX)
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
            ref={inputRef}
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
