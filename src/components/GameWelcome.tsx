/* eslint-disable */

import React from "react";
import styles from "./GameWelcome.module.css";
// import styles from "./GuessingGame.module.css";

// import PropTypes from "prop-types";

type props = {
    gameStart: boolean;
    setGameStart: any;
}

const GameWelcome = ({gameStart, setGameStart}: props) => {
    
    const clickPlay = () => {
        const button = null;

        const midiPlayerElement: HTMLElement = document.querySelector(".MidiPlayer  > Midi-player") as HTMLElement;
        
        if(midiPlayerElement != null){
            const shadowElement2: ShadowRoot = midiPlayerElement.shadowRoot as ShadowRoot;
            if(shadowElement2 != null){
                const button: HTMLElement = shadowElement2.querySelector("div > button") as HTMLElement;
                if(button != null){
                    button.click();
                }
            }
        }        
    };

    const intitializeGame = () => {
        clickPlay();
        setGameStart(true);
    };
    
    if(gameStart == false){
        return(
            <>
                <div className="flex min-h-screen justify-center">
                    <div className="grid max-w-3xl max-h-72 grid-rows-3 text-center">
                        <div>
                            <h1>Welcome to the Beatles Guessing Game</h1>
                        </div>
                        <div>
                            <button id="StartButton" onClick={intitializeGame} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}> Start game</button>                    
                        </div>
                        <div>
                            <img src="https://api.time.com/wp-content/uploads/2015/07/beatles-01.jpg"></img>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else {
        return null;
    }
};

// GameWelcome.propTypes = {
//     setGameStart: PropTypes.func,
//     gameStart: PropTypes.bool
// }

export default GameWelcome;