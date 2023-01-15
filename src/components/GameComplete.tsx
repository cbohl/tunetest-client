/* eslint-disable */

import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useMutation, gql } from "@apollo/client";
import styles from "./GuessSong.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faMusic } from "@fortawesome/free-solid-svg-icons";



const CREATE_SCORE_RECORD = gql`
    mutation CreateScoreRecord($artistId: Int, $username: String, $score: Int) {
        createScoreRecord(artistId: $artistId, username: $username, score: $score) {
            artistId
            username
            score
        }
    }
`;

// const ADD_TODO = gql`
//   mutation AddTodo($type: String!) {
//     addTodo(type: $type) {
//       id
//       type
//     }
//   }
// `;


interface props {
    artist: any;
    songsList: Song[];
    gameOver: boolean;
}

interface Song {
    title: string;
    midiLink: string;
    isCurrent: boolean;
    isCorrect: boolean;
}

const GameComplete = ({artist, songsList, gameOver}: props) => {
    const [createScoreRecord, { data, loading, error }] = useMutation(CREATE_SCORE_RECORD);
    let [username, setUsername] = useState("");  

    
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
    
    const submitScore = () => {
        console.log("this is the artist id", artist.id)
        createScoreRecord({ variables: { artistId: artist.id, username: username, score: totalGuessesCorrect() } });
    }

    const handleScoreSubmit = () => {
        // setUsername("");
        // if(guess.toUpperCase() === songTitle.toUpperCase()){
        //     toastCorrectGuess();
        //     nextSong();
        // }else{
        //     toastIncorrectGuess();
        // }
        submitScore()
    };

    const downHandler = (e: any) => {
        if(e.keyCode === 13){
            handleScoreSubmit()
        }
    }

    if(gameOver){
        return(
            <>
                <div className="flex min-h-screen justify-center">
                    <div className="grid max-w-3xl min-w-[60%] max-h-72 grid-rows-3 text-center">
                        <div>
                            <div className="mt-5">
                                <h4>Guesses Correct</h4>
                                <h1>{totalGuessesCorrect()}</h1>
                            </div>
                        </div>
                        <div>
                            <h1>Thanks for playing!</h1>
                            <a href={'/'}>Go back to main page</a>
                        </div>
                        <div>
                            <h1>Submit your score!</h1>
                            <div>
                                <input
                                    id="score-submit-text"
                                    className={styles.FormInput}
                                    type="text"
                                    name="Score Submit"
                                    placeholder="ENTER YOUR USERNAME HERE"
                                    value={username}
                                    onChange={e => { setUsername(e.target.value);}}
                                    onKeyDown={e => { downHandler(e); }}
                                ></input>
                            </div>
                            <div    
                                id="song-guess-submit-container"
                                className="grid place-items-center"
                            >
                                { !username ?
                                    <div id="EmptyUsernameButton" className="bg-red-500 text-white font-bold py-2 px-4 rounded w-3/4">
                                        <FontAwesomeIcon icon={faMusic} />
                                    </div>
                                    :      
                                    <div id="ScoreSubmitButton" className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-3/4 cursor-pointer"} onClick={() => handleScoreSubmit()}>
                                        <FontAwesomeIcon icon={faArrowUp} />
                                    </div>
                                }
                            </div>
                        </div>
                        {/* <div>
                            <img src= {"http://quiet-moon-2330.fly.dev/static/images/" + artist.lastName + "2.webp"}></img>
                        </div> */}
                    </div>
                </div>
            </>
        )
    } else{
        return null;
    }
}

export default GameComplete;
