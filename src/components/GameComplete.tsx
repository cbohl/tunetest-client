/* eslint-disable */

import React, {useState} from "react";
import PropTypes from "prop-types";

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
    console.log('outsidesongslist', songsList)
    console.log("is game over", gameOver)

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
            <div>
                <h1>is game over</h1>
                <h2>{gameOver.toString()}</h2>
                <h4>Guesses Correct</h4>
                <h1>{totalGuessesCorrect()}</h1>
            </div>
        )
    } else{
        return null;
    }
}


export default GameComplete;


// GameComplete.propTypes = {
//     songsList: PropTypes.array,
//     gameOver: PropTypes.bool
// };
