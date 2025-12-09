import {Navbar, Welcome, Dock} from "#components";
import { Terminal, Safari, Resume, Finder, Text } from "#windows";

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
            <Text />
        </main>

    )
}

export default App
