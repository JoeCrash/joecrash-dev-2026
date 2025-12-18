import useWindowStore from "#store/window.js";
import {Tooltip} from "react-tooltip";
import React from "react";

const WindowControls = ({ target }) => {
    const { closeWindow, maximizeWindow } = useWindowStore();
    return (
        <div id="window-controls">
            <div className="maximize"
                 onClick={() => maximizeWindow(target)}
                 data-tooltip-id="max-window-tooltip"
                 data-tooltip-content="Maximize Window"
                 data-tooltip-delay-show={150}
            />
            <Tooltip id="max-window-tooltip" place="right" className="tooltip" />
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
