/* eslint-disable */

import React, {useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import toast, { Toaster } from 'react-hot-toast';
import GameWelcome from "./GameWelcome.tsx";
import GuessSong from "./GuessSong";
import GameComplete from "./GameComplete.tsx";
import styles from "./GuessingGame.module.css";
import "html-midi-player";


const GuessingGame = (props) => {
    let [songIndex, setSongIndex] = useState(0);
    let [gameStart, setGameStart] = useState(false);
    let [gameOver, setGameOver] = useState(false);

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
        if(songIndex < props.songsList.length -1){
            clickPlay();
            setSongIndex(songIndex + 1);
        }else
            setGameOver(true);
        };
        
        return(
            <>

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