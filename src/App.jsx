import {Navbar, Welcome, Dock, Home} from "#components";
import {Terminal, Safari, Resume, Finder, TextViewer, ImageViewer, VideoViewer, Contact, Gallery} from "#windows";

const App = () => {
    return (
        <main>
            <Navbar/>
            <Welcome/>
            <Dock/>
            <Terminal/>
            <Safari/>
            <Resume/>
            <Finder/>
            <TextViewer/>
            <ImageViewer/>
            <VideoViewer/>
            <Contact/>
            <Gallery/>
            <Home/>
        </main>
    )
}

export default App
