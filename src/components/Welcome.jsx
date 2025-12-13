import React, {useRef} from 'react'
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const FONT_WEIGHTS = {
    subtitle: {min:100, max:400, default:200},
    title: {min:400, max:900, default:600},
}

const renderText = (text, className, baseWeight = 400) => {
    //split each letter into its own span.
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{fontVariationSettings: `'wght' ${baseWeight}`}}
        >
            {char === " " ? '\u00A0' : char}
        </span>
    ))
};

const setupTextHover = (container, type) => {
    if (!container) return () => {};
    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `'wght' ${weight}`
        });
    };

    let rafId = 0;
    let lastMouseX = 0;
    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        lastMouseX = e.clientX - left;
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            letters.forEach((letter) => {
                const { left: l, width: w } = letter.getBoundingClientRect();
                const distance = Math.abs(lastMouseX - (l - left + w / 2));
                const intensity = Math.exp(-(distance ** 2) / 10000);
                animateLetter(letter, min + (max - min) * intensity);
            });
        });
    };

    const handleMouseLeave = () => {
        letters.forEach((letter) => animateLetter(letter, base, 0.4));
    }

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    }
};


const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current, "title");
        const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

        return () => {
            titleCleanup?.();
            subtitleCleanup?.();
        }
    }, []);

    return (
        <section id="welcome">
            <p ref={subtitleRef}>{
                renderText("Hey, I'm JoeCrash, welcome to my", "text-3xl font-georama", FONT_WEIGHTS.subtitle.default)
            }</p>
            <h1 ref={titleRef} className="mt-7">{
                renderText("Portfolio", "opacity-35 text-gray-400 text-shadow-lg text-shadow-yellow-900 text-9xl italic font-georama", FONT_WEIGHTS.title.default)
            }</h1>
            <div className="small-screen">
                <p>This portfolio is designed for desktop/tablet screens only.</p>
            </div>
        </section>
    )
}
export default Welcome
