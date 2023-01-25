/* eslint-disable */

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import toast, { Toaster } from 'react-hot-toast';
import GameWelcome from "./GameWelcome.tsx";
import GuessSong from "./GuessSong";
import GameComplete from "./GameComplete.tsx";
import styles from "./GuessingGame.module.css";
import "html-midi-player";
import { useParams } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client";

// const GET_SONGS = gql`
//     query GetSongs {
//         songs {
//             id
//             title
//             midiFileURL
//         }
//     }`;

// const GET_ARTISTS = gql`
//     query allArtists {
//         allArtists {
//             id
//             firstName
//             lastName
//             songs {
//                 title
//                 midiFilePath
//             }
//         }
//     }`;

const GET_ARTIST_INFO = gql`
    query getArtistInfo($id: Int) {
        getArtistInfo(id: $id) {
            firstName
            lastName
            songs {
                title
                midiFilePath
            }
        }
    }
`;


//     const GET_ARTIST_SCORE_RECORDS = gql`
//     query GetArtistScoreRecords($artistId: Int) {
//         getArtistScoreRecords(artistId: $artistId) {
//             username
//             score
//         }
//     }
// `

const GuessingGame = (props) => {
    let [songIndex, setSongIndex] = useState(0);
    let [gameStart, setGameStart] = useState(false);
    let [gameOver, setGameOver] = useState(false);
    let [songs, setSongs] = useState([])
    let [artist, setArtist] = useState()
    let  { gameId }  = useParams();
    
    // debugger;
    
    // const { data, loading, error } = useQuery(GET_ARTISTS);
    // const { data, loading, error } = useQuery(GET_ARTIST_INFO, {variables: {id: useParams()}});
    
    // const { data: queryData, loading: queryLoading, error: queryError } = useQuery(GET_ARTIST_SCORE_RECORDS, {variables: {artistId: artist.id}});
    console.log("this is the gameId", gameId)
    // console.log("this is hte params", useParams())
    // debugger;
    const { data, loading, error } = useQuery(GET_ARTIST_INFO, {variables: {id: parseInt(gameId)}});
    
    useEffect(() => {
        if(loading === false && data){
            // debugger;
            // let blankSong = {}
            // let songs3 = data.allArtists[gameId - 1].songs
            // let updatedSongs = []

            // let newSongs = data.getArtistInfo.songs
            // newSongs[0].isCorrectlyGuessed = false
            // debugger;

            // data.getArtistInfo.songs.map(({id, title, midiFilePath}, i) => {
            //     blankSong.id = id
            //     blankSong.title = title
            //     blankSong.isCorrectlyGuessed = false
            //     blankSong.isCurrent = false
            //     blankSong.midiFilePath = midiFilePath
            //     updatedSongs.push(blankSong)
            //     blankSong = {}
            // })


            let updatedSongs = data.getArtistInfo.songs.map((item) => ({
                ...item,
                isCorrectlyGuessed: false,
                isCurrent: false
            }))

            setSongs(updatedSongs)
            setArtist(data.getArtistInfo)
        }
    }, [data]);

    const toastCorrectGuess = () => toast('Good guess!');
    const toastIncorrectGuess = () => toast("Incorrect guess!");

    const clickPlay = () => {
        document.querySelector(".NextMidiPlayer > Midi-player").shadowRoot.querySelector("div > button").click()
    };

    const nextSong = () => {
        songs[songIndex].isCorrect = true;
        
        if(songIndex < songs.length -1){
            clickPlay();
            setSongIndex(songIndex + 1);
        }else{
            setGameOver(true);
        }
    };

    const skipSong = () => {
        if(songIndex < songs.length -1){
            clickPlay();
            setSongIndex(songIndex + 1);
        }else
            setGameOver(true);
        };
        
        return(
            <div>
                <div>
                </div>

                <div>
                { songs.length > 0 ? 
                    <div>
                        <GameWelcome artist={artist} setGameStart={setGameStart} gameStart={gameStart}></GameWelcome>

                        <div className={ classNames.bind(styles)({
                            "MainGame": true,
                            "Hidden": !gameStart || gameOver
                        }) }>                
                            <Toaster />
                            <div className="flex min-h-screen justify-center">
                                <div className="grid max-h-72 min-h-screen min-w-[100%] grid-rows-4 text-center gap-4">
                                    <div className="mt-10">
                                        {songs.map((s, i) => { 
                                            return(
                                                <div className={ classNames.bind(styles)({
                                                    "MidiPlayer": true,
                                                    "DisplayMidiPlayer": songIndex == i,
                                                    "NextMidiPlayer": songIndex == i-1, 
                                                    "HiddenMidiPlayer": songIndex != i
                                                }) } key = {i}>
                                                    {/* <audio> */}
                                                        <midi-player
                                                            src= {process.env.REACT_APP_API_URL + "/static/" + s.midiFilePath}
                                                            loop
                                                        >
                                                        </midi-player>
                                                    {/* </audio> */}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="content-around">
                                        <GuessSong songTitle={songs[songIndex].title} nextSong={nextSong} toastCorrectGuess={toastCorrectGuess} toastIncorrectGuess={toastIncorrectGuess}/>
                                    </div>
                                    <div>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={skipSong}>Skip Song</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <GameComplete artist={artist} songsList={songs} gameOver={gameOver}></GameComplete>
                    </div>
                :
                        <h1>Loading data</h1>
                }
            </div>
        </div>
    );
};

GuessingGame.propTypes = {
    songsList: PropTypes.array
};

export default GuessingGame;