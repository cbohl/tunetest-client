/* eslint-disable */

import React, {useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import GuessSong from "./GuessSong";
import styles from "./GuessingGame.module.css";
import "html-midi-player";


const GuessingGame = (props) => {
    let [songIndex, setSongIndex] = useState(0);
    console.log("great props", props);

    const clickPlay = () => {
        document.querySelector(".nextMidiPlayer > midi-player").shadowRoot.querySelector("div > button").click()
    };


    const nextSong = () => {
        clickPlay();
        props.songsList[songIndex].isCorrect = true;

        console.log("Song index", songIndex, "songs list length", props.songsList.length);
        if(songIndex < props.songsList.length -1){
            console.log("inside");
            setSongIndex(songIndex + 1);
        }else
            alert("Out of songs!");
    };

    const skipSong = () => {
        if(songIndex < props.songsList.length -1){
            clickPlay();
            console.log("inside");
            setSongIndex(songIndex + 1);
        }else
            alert("Out of songs!");
    };

    // for version where user can skip songs and come back
    // const correctGuess = () =>
    //     clickPlay();
        // props.songsList[songIndex].isCorrect = true;
        
    //     // for
    //     for(i=0; i < songList.length; i++){
    //         if(i < songIndex.length - 1)
    //             < songIndex + 1]
    //     }

    // const manipulatePlay = () => {
    //     console.log("test");
    //     console.log(
    //         document.querySelector("#root > div.next-song > midi-player").shadowRoot.querySelector("div > button")
    //     );
    //     document.querySelector("#root > div.next-song > midi-player").shadowRoot.querySelector("div > button").click();
    //     // document.querySelector("#root > midi-player:nth-child(5)").shadowRoot.querySelector("div > button").click();
    // };

    return(
        <>
            <div id="super">
                <h1 className="testclass" id="special"> Current song {props.songsList[songIndex].title}</h1>
                <h2> Current link {props.songsList[songIndex].midiLink}</h2>
                <h3> Current index {songIndex}</h3>
            </div>

            <div>
                <h2> Test </h2>
                <h2> Test2 </h2>
                {props.songsList.map((s, i) => { 
                    return(
                        <div className={ classNames.bind(styles)({
                            "midiPlayer": true,
                            "displayMidiPlayer": songIndex == i,
                            "nextMidiPlayer": songIndex == i-1, 
                            "hiddenMidiPlayer": songIndex != i
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

            <GuessSong songTitle={props.songsList[songIndex].title} nextSong={nextSong}/>
            
            <button text="skip song" onClick={skipSong}>Skip Song</button>
            {/* <button onClick={manipulatePlay}>Test button</button> */}
        </>
    );
};

GuessingGame.propTypes = {
    songsList: PropTypes.array
};

export default GuessingGame;