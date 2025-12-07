import { create } from "zustand";
import {immer} from "zustand/middleware/immer";
import {INITIAL_Z_INDEX, WINDOW_CONFIG} from "#constants/index.js";

const useWindowStore = create(
    immer((set) =>
        ({
            windows: WINDOW_CONFIG,
            nextZIndex: INITIAL_Z_INDEX + 1,

            openWindow: (windowKey, data = null) =>
                set((state) => {
                    if(!state.windows[windowKey]){
                        console.error(`Open window ${windowKey} not found`);
                        return;
                    }
                    const win = state.windows[windowKey];
                    win.isOpen = true;
                    win.isMinimized = false;
                    win.zIndex = state.nextZIndex;
                    win.data = data ?? win.data;
                    state.nextZIndex ++;
                }),

            closeWindow: (windowKey, data = null) =>
                set((state) => {
                    if(!state.windows[windowKey]){
                        console.error(`Close window ${windowKey} not found`);
                        return;
                    }
                    const win = state.windows[windowKey];
                    win.isOpen = false;
                    win.isMinimized = false;
                    win.isMaximized = false;
                    win.zIndex = INITIAL_Z_INDEX;
                    win.data = null;

                }),

            toggleMinimizeWindow: (windowKey) =>
                set((state) => {
                    if(!state.windows[windowKey]){
                        console.error(`Toggle minimize window ${windowKey} not found`);
                        return;
                    }
                    const win = state.windows[windowKey];
                    // Only minimize if it's open
                    if (!win.isOpen) return;
                    win.isMinimized = !win.isMinimized;
                }),

            toggleMaximizeWindow: (windowKey) =>
                set((state) => {
                    if(!state.windows[windowKey]){
                        console.error(`Toggle maximize window ${windowKey} not found`);
                        return;
                    }
                    const win = state.windows[windowKey];
                    // Only maximize if it's open
                    if (!win.isOpen) return;
                    win.isMaximized = !win.isMaximized;

                    // Bring maximized window to front
                    if (win.isMaximized) {
                        win.zIndex = state.nextZIndex++;
                    }
                }),

            focusWindow: (windowKey, data = null) =>
                set((state) => {
                    if(!state.windows[windowKey]){
                        console.error(`Focus window ${windowKey} missing.`);
                        return;
                    }
                    const win = state.windows[windowKey];
                    win.zIndex = state.nextZIndex++;
                }),
        })
    )
);

export default useWindowStore;