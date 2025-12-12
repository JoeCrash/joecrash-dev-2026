import React from 'react'
import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
    const { closeWindow } = useWindowStore();
    return (
        <div id="window-controls">
            <div className="maximize" />
            <div className="minimize" />
            <div className="close" onClick={() => closeWindow(target)} />
        </div>
    )
}
export default WindowControls
