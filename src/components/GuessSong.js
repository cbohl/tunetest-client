/* eslint-disable */

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import styles from "./GuessSong.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faMusic } from "@fortawesome/free-solid-svg-icons";

const GuessSong = (props) => {    
    let [guess, setGuess] = useState("");    

    const handleGuess = () => {
        // event.preventDefault();
        if(guess === props.songTitle){
            alert("Correct!");
            setGuess("");
            console.log(props.songTitle);
            props.nextSong();
        }else{
            console.log("Incorrect guess"); 
        }
    };

    const enterSubmit = (e) => {
        e.preventDefault();
        handleGuess();
    }

    const adjustSubmitButtons = () => {
        console.log("adjust buttons");
    };

    return(
        <form onSubmit={(e) => enterSubmit(e)}>
            <div>
                <input
                    id="song-guess-text"
                    className={styles.formInput}
                    type="text"
                    name="Song Guess"
                    placeholder="ENTER YOUR GUESS HERE"
                    value={guess}
                    onChange={e => { setGuess(e.target.value); adjustSubmitButtons(); }}
                ></input>
            </div>
            <div
                id="song-guess-submit-container"
                className={styles.songGuessSubmitContainer}
                onClick={() => handleGuess()}
                type="submit"
            >
                <span>
                    { !guess ?
                        <div id="empty-guess-button" className={styles.emptyGuessButton}>
                            <FontAwesomeIcon icon={faMusic} />
                        </div>
                        :      
                        <div id="song-guess-submit-button" className={styles.songGuessSubmitButton}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </div>
                    }
                </span>
            </div>
        </form>
    );
};

GuessSong.propTypes = {
    songTitle: PropTypes.string,
    nextSong: PropTypes.func.isRequired
};  

export default GuessSong;

