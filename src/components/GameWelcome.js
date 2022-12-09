/* eslint-disable */

import React, {useState} from "react";
import PropTypes from "prop-types";

const GameWelcome = (props) => {
    const clickPlay = () => {
        // debugger;
        document.querySelector(".midiPlayer  > midi-player").shadowRoot.querySelector("div > button").click()
    };
    
    return(
        <div>
            <h1>Welcome to the Beatles Guessing Game</h1>
            <button onClick={() => clickPlay()}>Start game</button>
        </div>
    )
}

GameWelcome.propTypes = {
    nextSong: PropTypes.func
}

export default GameWelcome