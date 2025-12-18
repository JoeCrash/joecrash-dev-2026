import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Terminal state store: keeps history of commands and outputs
// shape of an entry: { id, timestamp, prompt, command, output, type }
// type: 'info' | 'error' | 'success' | 'system'
const useTerminalStore = create(
  immer((set) => ({
    history: [],
    nextId: 1,

    addEntry: (entry) =>
      set((state) => {
        state.history.push({
          id: state.nextId++,
          timestamp: new Date().toISOString(),
          type: "info",
          prompt: "guest@joecrash-dev ~ %",
          ...entry,
        });
      }),

    clearHistory: () =>
      set((state) => {
        state.history = [];
      }),
  }))
);

export default useTerminalStore;
