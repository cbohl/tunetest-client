/* eslint-disable */

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import GuessSong from "./GuessSong";
import styles from "./GuessingGame.module.css";
import "html-midi-player";


const GuessingGame = (props) => {
    let songsListBeta = ["And Your Bird Can Sing", "Yesterday", "Ticket to Ride"];
    let [songIndex, setSongIndex] = useState(0);

    const nextSong = () => {
        console.log("Song index", songIndex, "songs list length", props.songsList.length);
        if(songIndex < props.songsList.length -1){
            console.log("inside");
            setSongIndex(songIndex + 1);
        }else
            alert("Out of songs!");
    };

    const manipulatePlay = () => {
        console.log("test");
        console.log(
            document.querySelector("#root > div.next-song > midi-player").shadowRoot.querySelector("div > button")
        );
        document.querySelector("#root > div.next-song > midi-player").shadowRoot.querySelector("div > button").click();
        // document.querySelector("#root > midi-player:nth-child(5)").shadowRoot.querySelector("div > button").click();
    }

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
                {props.songsList.map((s, i) => { return(
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
                )})}

            </div>

            <GuessSong songTitle={props.songsList[songIndex].title} nextSong={nextSong}/>
            <button onClick={manipulatePlay}>Test button</button>
        </>
    );
};

GuessingGame.propTypes = {
    songsList: PropTypes.array
};

export default GuessingGame;