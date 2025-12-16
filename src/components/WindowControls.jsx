import useWindowStore from "#store/window.js";
import {Tooltip} from "react-tooltip";
import React from "react";

const WindowControls = ({ target }) => {
    const { closeWindow } = useWindowStore();
    return (
        <div id="window-controls">
            <div className="maximize" />
            <div className="minimize" />
            <div className="close"
                 onClick={() => closeWindow(target)}
                 data-tooltip-id="close-window-tooltip"
                 data-tooltip-content="Close Window"
                 data-tooltip-delay-show={150}
            />
            <Tooltip id="close-window-tooltip" place="right" className="tooltip" />
        </div>
    )
}
export default WindowControls
