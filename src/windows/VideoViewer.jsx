import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import useWindowStore from "#store/window.js";

const VideoViewer = () => {
    return (
        <div>VideoViewer</div>
    )
}
const VideoViewerWindow = WindowWrapper(VideoViewer, "videofile");
export default VideoViewer;
