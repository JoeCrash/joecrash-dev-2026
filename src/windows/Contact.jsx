import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components/index.js";
import {socials} from "#constants/index.js";

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact</h2>
            </div>
            <div className="p-5 space-y-5">
                <img src="/images/joecrash-01.png" alt="joecrash" className="w-40 rounded-xl"/>
                <h3>Let's connect</h3>
                <p>Got an idea? A bug to squash? Let's chat!</p>
                <p>joeycrash135@gmail.com</p>
                <ul>
                    {socials.map(({id, bg, link, icon, text}) => (
                        <li key={id} style={{ backgroundColor: bg}}>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={text}
                            >
                                <img src={icon} alt={text} className="size-5" />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
