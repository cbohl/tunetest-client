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

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";


const GET_SONGS = gql`
    query GetSongs {
    songs {
        id
        title
    }
    }
`;

const GuessingGame = (props) => {
    let [songIndex, setSongIndex] = useState(0);
    let [gameStart, setGameStart] = useState(false);
    let [gameOver, setGameOver] = useState(false);
    let [songs2, setSongs2] = useState([])

    const { data, loading, error } = useQuery(GET_SONGS);


    useEffect(() => {
        if(loading === false && data){
            console.log("setting ssongs!");

            // debugger;

            let blankSong = {}
            let songs3 = data.songs
            let songs4 = []
            // let songs5 = null

            songs3.map(({id, title}, i) => {
                blankSong.id = id
                blankSong.title = title
                blankSong.isCorrectlyGuessed = false
                blankSong.isCurrent = false
                console.log("1", songs4)
                console.log("2", blankSong)
                songs4.push(blankSong)
                console.log("3", songs4)
                // debugger;
                blankSong = {}
                // songs4[i].id = id
                // songs4[i].title = title
            })

            // songs5 = songs4


            console.log("songs4", songs4)
            // songs3.forEach(
            //     function(song){
            //         song.isCorrectlyGuessed = false;
            //         song.isCurrent = false;
            //     }
            // );
            
            setSongs2(songs4)
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
        props.songsList[songIndex].isCorrect = true;
        
        if(songIndex < props.songsList.length -1){
            clickPlay();
            setSongIndex(songIndex + 1);
        }else{
            setGameOver(true);
        }
    };

    const skipSong = () => {
        console.log(data)
        // debugger;
        if(songIndex < props.songsList.length -1){
            clickPlay();
            setSongIndex(songIndex + 1);
        }else
            setGameOver(true);
        };
        
        return(
            <>

            <div>
                <p>test</p>
                {/* <p> */}
                    { songs2.map(({id, title}, i) => {
                        return (
                            <div key={i}>
                                <h1> hi there!</h1>
                                <h2> {id}</h2>
                                <h2> {title} </h2>
                            </div>
                        )
                    })}
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

            <GameWelcome setGameStart={setGameStart} gameStart={gameStart}></GameWelcome>

            <div className={ classNames.bind(styles)({
                "MainGame": true,
                "Hidden": !gameStart || gameOver
            }) }>                
                <Toaster />
                <div className="flex min-h-screen justify-center">
                    <div className="grid max-h-72 min-h-screen min-w-[100%] grid-rows-4 text-center gap-4">
                        <div className="mt-10">
                            {props.songsList.map((s, i) => { 
                                return(
                                    <div className={ classNames.bind(styles)({
                                        "MidiPlayer": true,
                                        "DisplayMidiPlayer": songIndex == i,
                                        "NextMidiPlayer": songIndex == i-1, 
                                        "HiddenMidiPlayer": songIndex != i
                                    }) } key = {i}>
                                        <midi-player
                                            src= {s.midiLink}
                                            loop
                                        >
                                        </midi-player>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="content-around">
                            <GuessSong songTitle={props.songsList[songIndex].title} nextSong={nextSong} toastCorrectGuess={toastCorrectGuess} toastIncorrectGuess={toastIncorrectGuess}/>
                        </div>
                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={skipSong}>Skip Song</button>
                        </div>
                    </div>
                </div>
                {/* <div id="super">
                    <h1 className="testclass" id="special"> Current song {props.songsList[songIndex].title}</h1>
                    <h2> Current link {props.songsList[songIndex].midiLink}</h2>
                    <h3> Current index {songIndex}</h3>
                    <h2> Test </h2>
                    <h2> Test2 </h2>
                </div> */}
            </div>
            
            <GameComplete songsList={props.songsList} gameOver={gameOver}></GameComplete>
        </>
    );
};

GuessingGame.propTypes = {
    songsList: PropTypes.array
};

export default GuessingGame;