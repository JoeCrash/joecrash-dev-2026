import React from 'react'
import useWindowStore from "#store/window.js";

const WindowControls = ({target}) => {
    const { closeWindow, toggleMinimizeWindow, toggleMaximizeWindow } = useWindowStore();
    return (
        <div id="window-controls">
            <div className="close" onClick={() => closeWindow(target)} />
            <div className="minimize" onClick={() => toggleMinimizeWindow(target)} />
            <div className="maximize" onClick={() => toggleMaximizeWindow(target)} />
        </div>
    )
}
export default WindowControls;
