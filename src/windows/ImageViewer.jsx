import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import useWindowStore from "#store/window.js";

const ImageViewer = () => {
    const { windows } = useWindowStore();
    const data = windows?.imgfile?.data;

    if (!data) return null;

    const { name, imageUrl } = data || {};
    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                {name ? <h2>{name}</h2> : null}
            </div>
            <div className="bg-white p-6 space-y-4">
                {imageUrl ? (
                    <img src={imageUrl} alt={name || "image"} className="rounded w-full h-auto object-contain" />
                ) : null}

            </div>
        </>
    );
};

const ImageWindow = WindowWrapper(ImageViewer, "imgfile");
export default ImageWindow;
