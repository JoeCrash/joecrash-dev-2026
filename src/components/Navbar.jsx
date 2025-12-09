import dayjs from "dayjs";

import {navIcons, navLinks} from "../constants";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

const Navbar = () => {
    const { openWindow } = useWindowStore();
    const { setActiveLocationByType } = useLocationStore();
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo"/>
                <p className="font-bold">JoeCrash's Portfolio</p>
                <ul>
                    {navLinks.map(
                        ({id, name, type, location = false}) => (
                            <li key={id} role="button" onClick={
                                () => {
                                    openWindow(type);
                                    if(location) setActiveLocationByType(location);
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
                    {dayjs().format("ddd MMM D h:mm A")}
                </time>
            </div>
        </nav>
    )
}
export default Navbar
