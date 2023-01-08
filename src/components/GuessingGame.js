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

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";


const GET_SONGS = gql`
    query GetSongs {
        songs {
            id
            title
            midiFileURL
        }
    }`;

const GET_USERS = gql`
    query allUsers {
        allUsers{
            email 
            name
        }
    }
    `;

const GET_ARTISTS = gql`
    query allArtists {
        allArtists {
            firstName
            lastName
            songs {
                title
                midiFilePath
            }
        }
    }`;

    const GuessingGame = (props) => {
    let [songIndex, setSongIndex] = useState(0);
    let [gameStart, setGameStart] = useState(false);
    let [gameOver, setGameOver] = useState(false);
    let [songs2, setSongs2] = useState([])
    let [artist, setArtist] = useState()
    let { gameId } = useParams();

    console.log("This is the game id!!!", gameId)

    // const { data, loading, error } = useQuery(GET_SONGS);
    const { data, loading, error } = useQuery(GET_ARTISTS);


    useEffect(() => {
        if(loading === false && data){
            console.log("setting ssongs!");
            console.log("here is the data", data)

            // debugger;

            let blankSong = {}
            let artist1 = data.allArtists[gameId - 1]
            let blankArtist = {}
            let songs3 = data.allArtists[gameId - 1].songs
            console.log("here is songs3", songs3)
            let songs4 = []
            // let songs5 = null

            songs3.map(({id, title, midiFilePath}, i) => {
                blankSong.id = id
                blankSong.title = title
                blankSong.isCorrectlyGuessed = false
                blankSong.isCurrent = false
                blankSong.midiFilePath = midiFilePath
                console.log("1", songs4)
                console.log("2", blankSong)
                songs4.push(blankSong)
                console.log("3", songs4)
                // debugger;
                blankSong = {}
                // songs4[i].id = id
                // songs4[i].title = title
            })

            // debugger;

            // artist1.map(({id, firstName, lastName}, i) => {
            //     blankArtist.id = id
            //     blankArtist.firstName = firstName
            //     blankArtist.lastName = lastName
            // })


            // songs5 = songs4


            // console.log("songs4", songs4)
            // songs3.forEach(
            //     function(song){
            //         song.isCorrectlyGuessed = false;
            //         song.isCurrent = false;
            //     }
            // );
            
            setSongs2(songs4)
            setArtist(artist1)
        }
        console.log("in use effect")
    }, [data]);



            // songs3[0].isCurrent = true;

        // console.log("HERE IT IS", SONGS);



    const toastCorrectGuess = () => toast('Good guess!');
    const toastIncorrectGuess = () => toast("Incorrect guess!");

    const clickPlay = () => {
        document.querySelector(".NextMidiPlayer > Midi-player").shadowRoot.querySelector("div > button").click()
    };

    const nextSong = () => {
        songs2[songIndex].isCorrect = true;
        
        if(songIndex < songs2.length -1){
            clickPlay();
            setSongIndex(songIndex + 1);
        }else{
            setGameOver(true);
        }
    };

    const skipSong = () => {
        console.log(data)
        // debugger;
        if(songIndex < songs2.length -1){
            clickPlay();
            setSongIndex(songIndex + 1);
        }else
            setGameOver(true);
        };
        
        return(
        
            <div>
                <div>
                    {/* <p>test</p> */}
                    {/* <p> */}
                        {/* { songs2.map(({id, title}, i) => { */}
                            // return (
                                // <div key={i}>
                                    {/* <h1> hi there!</h1> */}
                                    {/* <h2> {id}</h2> */}
                                    {/* <h2> {title} </h2> */}
                                // </div>
                            )
                        // })}
                    {/* </p> */}
                    <h2> {songs2.length}</h2>
                </div>

                <div>
                    {/* {songs2 != [] ?
                        <p>{songs2[1].title}</p>
                    :
                        <p> nothing yet</p>
                    } */}
                    
                    {/* <p>{songs2?[1].name}</p> */}
                </div>

                <div>
                { songs2.length > 0 ? 
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
                                        {songs2.map((s, i) => { 
                                            return(
                                                <div className={ classNames.bind(styles)({
                                                    "MidiPlayer": true,
                                                    "DisplayMidiPlayer": songIndex == i,
                                                    "NextMidiPlayer": songIndex == i-1, 
                                                    "HiddenMidiPlayer": songIndex != i
                                                }) } key = {i}>
                                                    <midi-player
                                                        src= {"http://localhost:5000/" + s.midiFilePath}
                                                        loop
                                                    >
                                                    </midi-player>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="content-around">
                                        <GuessSong songTitle={songs2[songIndex].title} nextSong={nextSong} toastCorrectGuess={toastCorrectGuess} toastIncorrectGuess={toastIncorrectGuess}/>
                                    </div>
                                    <div>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={skipSong}>Skip Song</button>
                                    </div>
                                </div>
                            </div>
                            {/* <div id="super">
                                <h1 className="testclass" id="special"> Current song {songs2[songIndex].title}</h1>
                                <h2> Current link {songs2[songIndex].midiLink}</h2>
                                <h3> Current index {songIndex}</h3>
                                <h2> Test </h2>
                                <h2> Test2 </h2>
                            </div> */}
                        </div>
                        
                        <GameComplete artist={artist} songsList={songs2} gameOver={gameOver}></GameComplete>
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