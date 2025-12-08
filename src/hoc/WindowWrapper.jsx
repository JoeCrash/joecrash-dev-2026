import React, {useLayoutEffect, useRef} from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {Draggable} from "gsap/Draggable";

import useWindowStore from "#store/window.js";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const {focusWindow, windows} = useWindowStore();
        const {isOpen, zIndex} = windows[windowKey];
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
            if (!el || !isOpen) return;

            const [instance] = Draggable.create(el, {
                onPress: () => focusWindow(windowKey)
            });
            return () => {
                instance && instance.kill();
            }
        }, [isOpen]);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;

            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        return (<section id={windowKey} ref={ref} style={{zIndex}} className="absolute">
            <Component {...props} />
        </section>);
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;
    return Wrapped;
}
export default WindowWrapper
