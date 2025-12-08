import {Navbar, Welcome, Dock} from "#components";
import { Terminal, Safari, Resume, Finder } from "#windows";

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <Terminal />
            <Safari />
            <Resume />
            <Finder />
        </main>

    )
}

export default App
