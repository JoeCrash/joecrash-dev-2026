import {useState} from "react";
import dayjs from "dayjs";

import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

import {navIcons, navLinks} from "../constants";

const Navbar = () => {
    const { openWindow } = useWindowStore();
    const { setActiveLocationByType } = useLocationStore();

    const timeFormat = "ddd MMM D h:mm A";
    const [time, setTime] = useState(dayjs().format(timeFormat));
    setInterval(() => setTime(dayjs().format(timeFormat)), 1000);

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo"/>
                <p className="font-bold">JoeCrash's Portfolio</p>
                <ul>
                    {navLinks.map(
                        ({id, name, type, locationType = false, href}) => (
                            <li key={id} role="button" onClick={
                                () => {
                                    openWindow(type, {href} );
                                    locationType ? setActiveLocationByType(locationType) : null;
                                }
                            }>
                                <p>{name}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map(
                        ({id, img}) => <li key={id}><img key={`icon-${id}`} src={img} alt={`icon-${id}`}/></li>
                    )}
                </ul>
                <time>
                    {time}
                </time>
            </div>
        </nav>
    )
}
export default Navbar
