/* eslint-disable */

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import styles from "./GuessSong.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faMusic } from "@fortawesome/free-solid-svg-icons";
import IncorrectGuessMessage from "./IncorrectGuessMessage";

// Would need to prevent user submitting unless user has correct answer... 
// so check answer on every character typed and prevent submit unless it works, 
// hide fake submit buttons and hide fake form.. or maybe form only becomes a form
// if guessIsCorrect is true?

const GuessSong = (props) => {    
    let [guess, setGuess] = useState("");  

    const handleGuess = () => {
        setGuess("");
        if(guess === props.songTitle){
            // clickPlay();
            // alert("Correct!");
            console.log(props.songTitle);
            props.toastCorrectGuess();
            props.nextSong();
        }else{
            console.log("Incorrect guess"); 
            props.toastIncorrectGuess();

        }
    };

    const guessIsCorrect = () => {
        if(guess === props.songTitle){
            return true;
        } else {
            return false;
        }
    };

    const adjustSubmitButtons = () => {
        console.log("adjust buttons");
    };

    const clickPlay = () => {
        document.querySelector(".NextMidiPlayer > midi-player").shadowRoot.querySelector("div > button").click()
    };

    // useEffect(() => {
    //     if(guessIsCorrect()){
    //         const keyDownHandler = event => {
    //             console.log('User pressed: ', event.key);
    //             if (event.key === 'Enter') {
    //                 // event.preventDefault();
    //                 document.querySelector(".nextMidiPlayer > midi-player").shadowRoot.querySelector("div > button").click()
    //                 console.log("Guess is correct");
    //                 handleGuess();
    //             }
    //             else{
    //                 console.log("Guess is not right!");
    //             }
    //         }
    //         document.addEventListener('keydown', keyDownHandler);
      
    //         return () => {
    //             document.removeEventListener('keydown', keyDownHandler);
    //         };
    
    //     };
    
    //                 //   document.querySelector(".nextMidiPlayer > midi-player").shadowRoot.querySelector("div > button").click()
    //         //   if(guessIsCorrect()){
    //             // clickPlay();

    //             // Click play is hard coded in because this is the only way to avoid Chrome's AudioContext
    //             // disable for requiring gesture error message
      
    // });

    return(
        <div className="content-center">
            <div>
                <input
                    id="song-guess-text"
                    className={styles.FormInput}
                    type="text"
                    name="Song Guess"
                    placeholder="ENTER YOUR GUESS HERE"
                    value={guess}
                    onChange={e => { setGuess(e.target.value); adjustSubmitButtons(); }}
                ></input>
            </div>
            <div    
                id="song-guess-submit-container"
                className="grid place-items-center"
                type="submit"
            >
                { !guess ?
                    <div id="EmptyGuessButton" className="bg-red-500 text-white font-bold py-2 px-4 rounded w-3/4">
                        <FontAwesomeIcon icon={faMusic} />
                    </div>
                    :      
                    <div id="SongGuessSubmitButton" className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-3/4 cursor-pointer`} onClick={() => handleGuess()}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </div>
                }
            </div>
        </div>
    );
};

GuessSong.propTypes = {
    songTitle: PropTypes.string,
    nextSong: PropTypes.func.isRequired,
    toastCorrectGuess: PropTypes.func,
    toastIncorrectGuess: PropTypes.func
};  

export default GuessSong;


{/* <div>
    <h1> Bad guess!</h1>
    <IncorrectGuessMessage />
</div> */}