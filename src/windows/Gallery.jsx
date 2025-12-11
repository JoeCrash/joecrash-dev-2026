import {useState} from "react";
import clsx from "clsx";

import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import useWindowStore from "#store/window.js";
import useGalleryStore from "#store/gallery.js";
import { galleries } from "#constants/index.js";

const Gallery = () => {
    const { openWindow } = useWindowStore();
    const { setActiveGallery, activeGallery} = useGalleryStore();

    const [spans, setSpans] = useState({}); // {id: 'landscape'|'portrait'|'square'}

    const openImage = (item) => {
        const { id, img } = item || {};
        openWindow("imgfile", { name: `Photo ${id}`, imageUrl: img });
    };

    /* const onImgLoad = (id, e) => {
        const { naturalWidth: w, naturalHeight: h } = e.target;
        const type = w === h ? "square" : w > h ? "landscape" : "portrait";
        setSpans((prev) => (prev[id] === type ? prev : ({ ...prev, [id]: type })));
    }; */

    /* const spanClass = (id) => {
        const type = spans[id];
        if (type === "landscape") return "col-span-2 row-span-1";
        if (type === "portrait") return "col-span-1 row-span-2";
        return "col-span-1 row-span-1"; // square/default
    }; */

    const renderList = (name, items) => (
        <div>
            <h3>{name}</h3>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActiveGallery(item)}
                        className={clsx(item.id === activeGallery?.id ? "active" : "not-active")}
                    >
                        <img src={item.icon} alt={item.name || item.title} className="w-4" />
                        <p className="text-sm font-medium truncate">
                            {item.name || item.title}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
            <div id="window-header">
                <WindowControls target="photos"/>
                <h2>Gallery</h2>
            </div>
            <div className="bg-white flex mx-auto">
                <div className="sidebar">
                    {galleries && renderList("Albums", Object.values(galleries)) }
                </div>
                <div className="gallery">
                    <ul>
                        {activeGallery?.children?.map((item) => (
                            <li key={item.id} onClick={() => openImage(item)}>
                                <img
                                    src={item.img}
                                    alt={`Photo ${item.id}`}
                                    className="hover:opacity-90 cursor-pointer transition"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

const GalleryWindow = WindowWrapper(Gallery, "photos");
export default GalleryWindow;
