/* eslint-disable */

import React, {useState} from "react";
import PropTypes from "prop-types";

const GameComplete = (props) => {
    console.log('outsidesongslist', props.songsList)
    console.log("is game over", props.gameOver)

    const totalGuessesCorrect = (songsList) => {
        let numberCorrect = 0
        console.log("guess correct songslist", songsList);
        songsList.forEach(song => {
            if(song.isCorrect){
                numberCorrect ++
            }
        });
        return numberCorrect
    }

    if(props.gameOver){
        return(
            <div>
                <h1>is game over</h1>
                <h2>{props.gameOver.toString()}</h2>
                <h4>Guesses Correct</h4>
                <h1>{totalGuessesCorrect(props.songsList)}</h1>
            </div>
        )
    } else{
        return null;
    }
}




GameComplete.propTypes = {
    songsList: PropTypes.array,
    gameOver: PropTypes.bool
};

export default GameComplete;