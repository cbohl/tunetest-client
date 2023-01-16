/* eslint-disable */

import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, useMutation, gql } from "@apollo/client";
import styles from "./GuessSong.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faMusic } from "@fortawesome/free-solid-svg-icons";
import { query } from "express";



const GET_ARTIST_SCORE_RECORDS = gql`
    query GetArtistScoreRecords($artistId: Int) {
        getArtistScoreRecords(artistId: $artistId) {
            username
            score
        }
    }
`

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
    console.log("this is the artist id", artist.id)
    const { data: queryData, loading: queryLoading, error: queryError } = useQuery(GET_ARTIST_SCORE_RECORDS, {variables: {artistId: artist.id}});
    const [createScoreRecord, { data, loading, error }] = useMutation(CREATE_SCORE_RECORD);
    let [scoreRecords, setScoreRecords] = useState<any[]>([]);
    let [username, setUsername] = useState("");  
    let [scoreSubmitted, setScoreSubmitted] = useState(false)
    
    // debugger


    console.log("here is the query data", queryData)
    if(scoreRecords.length > 0){
        // debugger
        console.log("here is the scoreRecords", scoreRecords[0].score)
    }
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
        let y = scoreRecords
        y.push({username: username, score: totalGuessesCorrect()})
        y = y.slice().sort((a: any, b: any) => {
            return (a.score < b.score) ? 1: -1
        })
        setScoreRecords(y)
        setScoreSubmitted(true)

        // debugger;

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

    useEffect(() => {
        if(queryLoading === false && queryData){
            // queryData.getArtistScoreRecords.sort((a: any, b: any) => {
            //     if (a.score > b.score){
            //         return 1
            //     }
            //     return -1
            // }

            // queryData.getArtistScoreRecords.sort((a: any, b: any) => {
            //     return a.price - b.price
            // }

            // debugger;

            let x = queryData.getArtistScoreRecords.slice().sort((a: any, b: any) => {
                return (a.score < b.score) ? 1: -1
            })

            x = x.slice(0, 10)


            // setScoreRecords(x)

            // let x = queryData.getArtistScoreRecords

            // debugger;
            setScoreRecords(x)
        }
    }, [queryData])

    if(gameOver){
        return(
            <>
                <div className="flex min-h-screen justify-center">
                    <div className="grid max-w-3xl min-w-[60%] max-h-72 grid-rows-3 text-center">
                        <div>
                            <h3> it goes here</h3>
                            <h3>{scoreRecords[0].score}</h3>
                        </div>
                        <div>

                        </div>
                        <div>

                        </div>
                        <div>

                        </div>                 
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
                        { !scoreSubmitted ?
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
                                        >
                                    </input>
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
                            :
                            <div className="mx-auto block h-64 w-30">
                                <img src= {process.env.REACT_APP_API_URL + "/static/images/" + artist.lastName + "2.webp"} className="object-cover scale-100 hover:scale-125 ease-in duration-500 z-10"></img>
                            </div>

                            


                        }
                        <div>
                            {  
                                scoreRecords.map((record: any) => {
                                    return(
                                        <>
                                            <h1>{record.username} {record.score}</h1>
                                            {/* // <h2>{scoreRecords[0].username}</h2> */}
                                            {/* <h2> Test test test</h2> */}
                                        </>
                                    )    
                                })
                            }
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
