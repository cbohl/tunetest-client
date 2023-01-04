/* eslint-disable */

import React from "react";
import { isAsteriskToken } from "typescript";
// import styles from "./GameWelcome.module.css";

interface Props {
    artist: any;
    gameStart: boolean;
    setGameStart: any;
}

const GameWelcome = ({ artist, gameStart, setGameStart}: Props) => {
    
    const clickPlay = () => {
        let button: HTMLElement | null;
        const midiPlayerElement: HTMLElement = document.querySelector(".MidiPlayer  > Midi-player") as HTMLElement;
        
        if(midiPlayerElement != null){
            const shadowElement2: ShadowRoot = midiPlayerElement.shadowRoot as ShadowRoot;
            if(shadowElement2 != null){
                button = shadowElement2.querySelector("div > button") as HTMLElement;
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
                    <div className="grid max-w-3xl min-w-[60%] max-h-72 grid-rows-3 text-center">
                        <div className="mt-10">
                            <h1>Welcome to the  {artist.firstName} {artist.lastName} Guessing Game!</h1>
                        </div>
                        <div>
                            <button id="StartButton" onClick={intitializeGame} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover-cursor"}> Start game</button>                    
                        </div>
                        <div>
                            <img src= {"http://localhost:5000/images/" + artist.lastName + "1.webp"}></img>
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

export default GameWelcome;