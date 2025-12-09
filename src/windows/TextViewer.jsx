import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import useWindowStore from "#store/window.js";

const TextViewer = () => {
    const { windows } = useWindowStore();
    const data = windows?.txtfile?.data;

    if (!data) return null;

    const { name, image, subtitle, description } = data || {};

    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile" />
                {name ? <h2>{name}</h2> : null}
            </div>
            <div className="bg-white p-6 space-y-4">
                {image ? (
                    <img src={image} alt={name || "text image"} className="rounded w-full h-auto" />
                ) : null}
                {subtitle ? <h3 className="text-lg font-semibold">{subtitle}</h3> : null}
                {Array.isArray(description) && description.length > 0 ? (
                    <div className="space-y-3">
                        {description.map((para, idx) => (
                            <p key={idx} className="leading-relaxed text-base text-gray-800">
                                {para}
                            </p>
                        ))}
                    </div>
                ) : null}
            </div>
        </>
    );
};

const TextWindow = WindowWrapper(TextViewer, "txtfile");
export default TextWindow;
