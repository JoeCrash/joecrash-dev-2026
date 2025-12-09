import {Navbar, Welcome, Dock} from "#components";
import {Terminal, Safari, Resume, Finder, TextViewer, ImageViewer} from "#windows";

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
            <TextViewer />
            <ImageViewer />
        </main>

    )
}

export default App
