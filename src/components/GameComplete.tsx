/* eslint-disable */

import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


interface props {
    songsList: Song[];
    gameOver: boolean;
}

interface Song {
    title: string;
    midiLink: string;
    isCurrent: boolean;
    isCorrect: boolean;
}

const GameComplete = ({songsList, gameOver}: props) => {

    const totalGuessesCorrect = () => {
        let numberCorrect = 0
        console.log("guess correct songslist", songsList);
        (songsList as any).forEach((song: Song) => {
            console.log("song object!!!", song)
            if(song.isCorrect){
                numberCorrect ++
            }
        });
        return numberCorrect
    }

    if(gameOver){
        return(
            <>
                <div className="flex min-h-screen justify-center">
                    <div className="grid max-w-3xl min-w-[60%] max-h-72 grid-rows-3 text-center">
                            <div className="mt-5">
                                <h4>Guesses Correct</h4>
                                <h1>{totalGuessesCorrect()}</h1>
                            </div>
                        <div>
                            <h1>Thanks for playing!</h1>
                            <a href={'/'}>Go back to main page</a>
                        </div>
                        <div>
                            <img src = "https://api.time.com/wp-content/uploads/2015/07/beatles-06.jpg"></img>
                        </div>
                    </div>
                </div>
            </>
        )
    } else{
        return null;
    }
}

export default GameComplete;
