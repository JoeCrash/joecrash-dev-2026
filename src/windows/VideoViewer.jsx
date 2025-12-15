import React, { useEffect, useRef, useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import VideoUI from "#components/VideoUI.jsx";
import { WindowControls } from "#components/index.js";
import useWindowStore from "#store/window.js";

const VideoViewer = () => {
    const { windows } = useWindowStore();
    const data = windows?.videofile?.data;
    const videoRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const VOLUME_KEY = "video_volume";
    const clamp01 = (n) => Math.max(0, Math.min(1, n));
    const [volume, setVolume] = useState(() => {
        const saved = Number(localStorage.getItem(VOLUME_KEY));
        return Number.isFinite(saved) ? clamp01(saved) : .5;
    });

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.volume = clamp01(volume);
        localStorage.setItem(VOLUME_KEY, String(volume));
    }, [data?.video, volume]);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onTime = () => setCurrentTime(v.currentTime || 0);
        const onDur = () => setDuration(v.duration || 0);
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onVol = () => setVolume(v.volume ?? 1);

        // initial sync
        onDur(); onTime(); onVol(); setIsPlaying(!v.paused);

        //add listeners here, auto add/remove.
        const listeners = [
            {event:"timeupdate", func:onTime},
            {event:"durationchange", func:onDur},
            {event:"loadedmetadata", func:onDur},
            {event:"play", func:onPlay},
            {event:"pause", func:onPause},
            {event:"ended", func:onPause},
            {event:"volumechange", func:onVol}
        ];

        listeners.map(({event, func}) => v.addEventListener(event, func));

        return () => {
            listeners.map(({event, func}) => v.removeEventListener(event, func));
        };

    }, [data?.video]); // rebind if the src changes

    if (!data) return null;
    const { name, video, ytEmbed } = data;

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play().catch(() => {/* autoplay blocked or other error */});
        else v.pause();
    };

    const seek = (t) => {
        const v = videoRef.current;
        if (!v) return;
        v.currentTime = Math.max(0, Math.min(t, v.duration || 0));
    };

    const rewind = () => seek((videoRef.current?.currentTime || 0) - 10);
    const forward = () => seek((videoRef.current?.currentTime || 0) + 10);

    const setVol = (val) => {
        const next = clamp01(val);
        setVolume(next);

        const v = videoRef.current;
        if (!v) return;
        v.volume = next;
    };

    return (
        <>
            <div id="window-header">
                {name ? <h2>{name}</h2> : null}
                <WindowControls target="videofile" />
            </div>

            <div className="player">
                {video ? (
                    <video
                        ref={videoRef}
                        src={video}
                        controls={false}   // hide native controls
                        className="w-full"
                        autoPlay
                    />
                ) : null}

                {ytEmbed && !video ? (
                    <iframe
                        width="560"
                        height="315"
                        src={ytEmbed}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                ) : null}
            </div>

            <div className="">
                {video && !ytEmbed ? (
                    <VideoUI
                        isPlaying={isPlaying}
                        currentTime={currentTime}
                        duration={duration}
                        volume={volume}
                        onTogglePlay={togglePlay}
                        onSeek={seek}
                        onRewind={rewind}
                        onForward={forward}
                        onVolume={setVol}
                    />
                ) : null}
            </div>
        </>
    );
};

const VideoViewerWindow = WindowWrapper(VideoViewer, "videofile");
export default VideoViewerWindow;