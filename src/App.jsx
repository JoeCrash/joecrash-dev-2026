import {Navbar, Welcome, Dock} from "#components";
import {Terminal, Safari, Resume, Finder, TextViewer, ImageViewer, Contact} from "#windows";

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
            <Contact />
        </main>

    )
}

export default App
