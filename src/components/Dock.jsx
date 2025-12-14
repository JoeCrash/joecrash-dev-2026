import React, {useRef} from 'react'

import {Tooltip} from "react-tooltip";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {dockApps} from "#constants/index.js";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

const Dock = () => {
    const {openWindow, closeWindow, windows } = useWindowStore();
    const { setActiveLocationByType } = useLocationStore();
    const dockRef = useRef(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return () => {};

        const icons = dock.querySelectorAll(".dock-icon");
        const imgs  = dock.querySelectorAll(".dock-img");
        const totalIcons = icons.length;

        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();

            icons.forEach((icon, index) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;

                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2.1) / 10000);

                // wavey icons animation
                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.18,
                    ease: "power2.out",
                    overwrite: "auto",
                });

                // rainbow hue setter, based on mouse pos
                const hue = (mouseX * 0.9 + index * 45) % 360;
                imgs[index]?.style.setProperty("--h", hue);

                // glow brightness
                gsap.to(imgs[index], {
                    "--a": Math.min(1, intensity * 0.9),
                    duration: 0.18,
                    ease: "power2.out",
                    overwrite: "auto",
                });
            });
        };

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();
            const mouseX = e.clientX - left;
            animateIcons(mouseX);
        };

        const resetIcons = () => {
            // hard stop any in-flight tweens so reset always completes
            gsap.killTweensOf(icons);
            gsap.killTweensOf(imgs);

            gsap.to(icons, {
                scale: 1,
                y: 0,
                duration: 0.22,
                ease: "power2.out",
                overwrite: "auto",
            });

            gsap.to(imgs, {
                "--a": 0,
                duration: 0.18,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        };
    }, []);


    const toggleApp = (app) => {
        if(!app.canOpen) return;

        if(app.id === "trash") {
            setActiveLocationByType("trash");
            app.id = "finder";
        }

        const win = windows[app.id];

        if(!win) {
            console.error(`Window ${app.id} not found`);
            return;
        }

        win.isOpen ? closeWindow(app.id) : openWindow(app.id);

    }
    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({id,name,icon,canOpen}) => (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({id, canOpen})}
                        >
                            <span className="dock-led" aria-hidden />
                            <img
                                src={`${icon}`}
                                alt={name}
                                loading="lazy"
                                className={`dock-img ${canOpen ? "" : "opacity-60"}`}
                            />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    )
}
export default Dock
