import {Navbar, Welcome, Dock} from "#components";
import { Terminal, Safari, Resume } from "#windows";

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <Terminal />
            <Safari />
            <Resume />
        </main>

    )
}

export default App
