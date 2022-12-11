/* eslint-disable */

import React, {useState} from "react";
import PropTypes from "prop-types";

const GameWelcome = (props) => {
    const clickPlay = () => {
        // debugger;
        document.querySelector(".midiPlayer  > midi-player").shadowRoot.querySelector("div > button").click()
    };

    const intitializeGame = () => {
        clickPlay();
        props.setGameStart(true);
    }
    
    if(props.gameStart == false){
        return(
            <div>
                <h1>Welcome to the Beatles Guessing Game</h1>
                <button id="StartButton"onClick={intitializeGame}>Start game</button>
            </div>
        )
    }
    else {
        return null;
    }
}

GameWelcome.propTypes = {
    setGameStart: PropTypes.func,
    gameStart: PropTypes.bool
}

export default GameWelcome