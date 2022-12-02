import React, {useState} from "react";
import styles from "./GuessSong.module.css";

const GuessSong = () => {

    console.log("test 4");
    const [guess, setGuess] = useState("");
    const songTitle = "Yesterday";

    const handleGuess = () => {
        console.log("Guess attempt");
        if(guess === songTitle){
            alert("Correct!");
        }else{
            console.log("Incorrect guess");
        }
    }; 

    return(
        <div>
            <h2>In the guessSong component</h2>
            <div>
                <input
                    id="song-guess"
                    className={styles.formInput}
                    type="text"
                    name="Song Guess"
                    placeholder="ENTER YOUR GUESS HERE"
                    value={guess}
                    onChange={e => setGuess(e.target.value)}
                />
            </div>
            <div>
                <button
                    id="song-guess-submit"
                    className="submit-button"
                    type="submit"
                    value="Hello!"
                    onClick={() => handleGuess() }
                >
                    Guess   
                </button>   
            </div>     
        </div>
    );
};

// onChange={(e) => handleGuessChange(e.currentTarget.value)}

export default GuessSong;