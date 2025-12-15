const fmt = (t = 0) => {
    if (!Number.isFinite(t)) t = 0;
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = Math.floor(t % 60);
    const pad = (n) => String(n).padStart(2, "0");
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

export default function VideoUi({
                                    isPlaying,
                                    currentTime,
                                    duration,
                                    volume, // 0..1
                                    onTogglePlay,
                                    onSeek,
                                    onRewind,
                                    onForward,
                                    onVolume,
                                }) {
    return (
        <div id="video-controls">
            <div className="controls">
                <div className="volume-slider">
                    <img src="/icons/video/volume.svg" alt="" className="w-4 m-1.5 inline-block" />
                    <input
                        className="w-full h-10"
                        type="range"
                        min="0"
                        max="100"
                        value={Math.round(volume * 100)}
                        onInput={(e) => onVolume(Number(e.target.value) / 100)}
                    />
                </div>

                <div className="playnav">
                    <button onClick={onRewind}>
                        <img src="/icons/video/rewind.svg" alt="" className="w-10 inline-block" />
                    </button>

                    <button onClick={onTogglePlay}>
                        <img
                            src={isPlaying ? "/icons/video/pause.svg" : "/icons/video/play.svg"}
                            alt=""
                            className="w-14 inline-block"
                        />
                    </button>

                    <button onClick={onForward}>
                        <img src="/icons/video/fast-forward.svg" alt="" className="w-10 inline-block" />
                    </button>
                </div>

                <div className="sidebar">
                    <button>
                        <img src="/icons/video/display-frame.svg" alt="" className="w-4" />
                    </button>
                    <button>
                        <img src="/icons/video/share.svg" alt="" className="w-4" />
                    </button>
                    <button>
                        <img src="/icons/video/sidebar-arrow.svg" alt="" className="w-4" />
                    </button>
                </div>
            </div>

            <div className="timeline">
                <span className="start-time">{fmt(currentTime)}</span>

                <div className="scrub">
                    <input
                        type="range"
                        min="0"
                        max={Math.max(duration || 0, 0)}
                        step="0.01"
                        value={Math.min(currentTime, duration || 0)}
                        onChange={(e) => onSeek(Number(e.target.value))}
                    />
                </div>

                <span className="duration">{fmt(duration)}</span>
            </div>
        </div>
    );
}
