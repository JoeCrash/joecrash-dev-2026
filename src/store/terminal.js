import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Terminal state store: keeps history of commands and outputs
// shape of an entry: { id, timestamp, prompt, command, output, type }
// type: 'info' | 'error' | 'success' | 'system'
const MAX_COMMANDS = 15;

const useTerminalStore = create(
  immer((set) => ({
    history: [], // visible output rows
    commands: [], // chronological command strings (oldest -> newest)
    nextId: 1,

    addEntry: (entry) =>
      set((state) => {
        // push visible row
        state.history.push({
          id: state.nextId++,
          timestamp: new Date().toISOString(),
          type: "info",
          prompt: "guest@joecrash-dev ~ %",
          ...entry,
        });
        // also track the command in the capped buffer if present
        if (entry && typeof entry.command === "string" && entry.command.trim().length > 0) {
          state.commands.push(entry.command);
          // cap to last MAX_COMMANDS
          if (state.commands.length > MAX_COMMANDS) {
            state.commands = state.commands.slice(state.commands.length - MAX_COMMANDS);
          }
        }
      }),

    clearHistory: () =>
      set((state) => {
        // Clear only the visible rows; keep commands for arrow navigation
        state.history = [];
      }),
  }))
);

export default useTerminalStore;
