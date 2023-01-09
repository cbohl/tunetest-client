/* eslint-disable */

import React, {useState} from "react";
import styles from "./GuessSong.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faMusic } from "@fortawesome/free-solid-svg-icons";

interface Props{
    songTitle: string;
    nextSong: any;
    toastCorrectGuess: any;
    toastIncorrectGuess: any;  
}

const GuessSong = ({songTitle, nextSong, toastCorrectGuess, toastIncorrectGuess}: Props) => {    
    let [guess, setGuess] = useState("");  

    // document.querySelector('#txtSearch').addEventListener('keypress', function (test) {
        // if (test.key === 'Enter') {
          // code for enter
        // }
    // });

    const handleGuess = () => {
        setGuess("");
        if(guess === songTitle){
            toastCorrectGuess();
            nextSong();
        }else{
            toastIncorrectGuess();
        }
    };

    const downHandler = (e: any) => {
        if(e.keyCode === 13){
            handleGuess()
        }
    }

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
                    onChange={e => { setGuess(e.target.value);}}
                    onKeyDown={e => { downHandler(e); }}
                ></input>
            </div>
            <div    
                id="song-guess-submit-container"
                className="grid place-items-center"
            >
                { !guess ?
                    <div id="EmptyGuessButton" className="bg-red-500 text-white font-bold py-2 px-4 rounded w-3/4">
                        <FontAwesomeIcon icon={faMusic} />
                    </div>
                    :      
                    <div id="SongGuessSubmitButton" className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-3/4 cursor-pointer"} onClick={() => handleGuess()}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </div>
                }
            </div>
        </div>
    );
};


export default GuessSong;