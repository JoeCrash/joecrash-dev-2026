import dayjs from "dayjs";

import {navIcons, navLinks} from "../constants";


const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo"/>
                <p className="font-bold">JoeCrash's Portfolio</p>
                <ul>
                    {navLinks.map(({id, name}) =>
                        <li key={id}><p>{name}</p></li>)
                    }
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map(({id, img}) =>
                        <img src={img} alt={`icon-${id}`}></img>)
                    }
                </ul>
                <time>
                    {dayjs().format("ddd MMM D h:mm A")}
                </time>
            </div>
        </nav>
    )
}
export default Navbar
