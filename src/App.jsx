import {Navbar, Welcome, Dock, Home} from "#components";
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
            <Home />
        </main>

    )
}

export default App
