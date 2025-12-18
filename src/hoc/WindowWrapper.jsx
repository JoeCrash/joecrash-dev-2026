import React, {useLayoutEffect, useRef} from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {Draggable} from "gsap/Draggable";
import clsx from "clsx";

import useWindowStore from "#store/window.js";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const {focusWindow, windows} = useWindowStore();
        const {isOpen, zIndex, isMaximized} = windows[windowKey];
        const ref = useRef(null);

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;
            el.style.display = "block";
            gsap.fromTo(el, {scale: 0.75, opacity: 0, y: 250},
                {scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out"});
        }, [isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen || isMaximized) return;
            const header = el.querySelector("#window-header"); // scoped lookup
            const [instance] = Draggable.create(el, {
                trigger: header || el,
            });
            return () => {
                instance && instance.kill();
            }
        }, [isOpen, isMaximized]);

        // When maximizing, reset any drag transform so the window snaps to (0, 56px) via CSS class
        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            if (isMaximized) {
                // Remove GSAP/Draggable transform offsets
                gsap.set(el, { x: 0, y: 0 });
                el.style.removeProperty("transform");
            }
        }, [isMaximized]);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;

            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        return (<section
            id={windowKey}
            ref={ref}
            style={{ zIndex }}
            className={clsx("absolute", isMaximized && "window-maximized")}
            onPointerDownCapture={() => focusWindow(windowKey)}
        >
            <Component {...props} />
        </section>);
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;
    return Wrapped;
}
export default WindowWrapper
