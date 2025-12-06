import React from 'react'
import {Navbar, Welcome} from "./components";

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <h1 className="text-3xl font-bold underline">Welcome to my portfolio</h1>
        </main>

    )
}

export default App
