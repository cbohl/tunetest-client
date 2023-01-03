import React from "react";
import GuessingGame from "./GuessingGame";
import {Route, Routes, Link} from 'react-router-dom';

const App = () => {
    return(
        <>
            <h1>This is the home page</h1>

            <nav>
                <ul>
                    <li><Link to="/game">Play Game</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/game" element={<GuessingGame />} />
            </Routes>
        </>
    )
}

export default App