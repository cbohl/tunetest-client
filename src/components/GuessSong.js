import React, {useState} from "react";
import styles from "./GuessSong.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faMusic } from "@fortawesome/free-solid-svg-icons";

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

    const adjustSubmitButtons = () => {
        console.log("adjust buttons");
    };

    return(
        <div>
            <FontAwesomeIcon icon={faArrowUp} />
            <h2>In the guessSong component</h2>
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

// onChange={(e) => handleGuessChange(e.currentTarget.value)}

export default GuessSong;


// $('.email').on("change keyup paste",
//   function(){
//     if($(this).val()){
//       $('.icon-paper-plane').addClass("next");
//     } else {
//       $('.icon-paper-plane').removeClass("next");
//     }
//   }
// );




// <div>
// <button
//     id="song-guess-submit"
//     className="submit-button"
//     type="submit"
//     value="Hello!"
//     onClick={() => handleGuess() }
// >
//     Guess   
// </button>   
// </div>   

// .animated-button
// span.icon-repeat-lock
//   i.fa.fa-lock
// span.next-button.repeat-password
//   i.fa.fa-paper-plane