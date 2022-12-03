import React, {useState} from "react";
import PropTypes from "prop-types";
import styles from "./GuessSong.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faMusic } from "@fortawesome/free-solid-svg-icons";

const GuessSong = (props) => {    
    let [guess, setGuess] = useState("");

    const handleGuess = () => {
        if(guess === props.songTitle){
            alert("Correct!");
            setGuess("");
            console.log(props.songTitle);
            props.nextSong();
        }else{
            console.log("Incorrect guess"); 
        }
    };

    const adjustSubmitButtons = () => {
        console.log("adjust buttons");
    };

    return(
        <div>
            <FontAwesomeIcon icon={faArrowUp} />
            <h2>In the guessSong component</h2>
            <h3>Current song in guessSong component {props.songTitle}</h3>
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
        </div>
    );
};

GuessSong.propTypes = {
    songTitle: PropTypes.string,
    nextSong: PropTypes.func.isRequired
};  

export default GuessSong;

