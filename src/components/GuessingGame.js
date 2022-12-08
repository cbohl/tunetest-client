/* eslint-disable */

// import React, {useState, useEffect} from "react";
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import GuessSong from "./GuessSong";
import styles from "./GuessingGame.module.css";

import "html-midi-player";


const GuessingGame = (props) => {
    const inputElement = React.useRef();
    let songsListBeta = ["And Your Bird Can Sing", "Yesterday", "Ticket to Ride"];
    let [songIndex, setSongIndex] = useState(0);

    // useEffect(() => {
    //     console.log("After effect");
    //     console.log(inputElement);
    //     console.log(document.querySelector("#root > midi-player:nth-child(5)").shadowRoot.querySelector("div > button"));
    //     document.querySelector("#root > midi-player:nth-child(5)").shadowRoot.querySelector("div > button").click();
    // });

    console.log(props);

    // class Song {
    //     constructor(title, midiLink) {
    //         this.title = title;
    //         this.midiLink = midiLink;
    //     }
    // }

    // let song1 = new Song("Hey Jude", "https://bitmidi.com/uploads/16427.mid");
    // let song2 = new Song("Eight Days a Week", "https://bitmidi.com/uploads/16425.mid");
    // let song3 = new Song("Penny Lane", "https://bitmidi.com/beatles-penny-lane-2-k-mid#:~:text=Download%20BEATLES.Penny%20lane%202%20k.mid");

    // let songsList = [song1, song2, song3]; 
    // let songLink = "";   
    

    // The guessing game component always pre-loads the next song but hides it from view.
    // This allows a successful user guess to programatically trigger the playing of the next song. 
    // Using a React Hook to programatically click play after the DOM Manipulation of a React Hook
    // would be prevented by Google Chrome's AudioContext requirement of user action.

    const nextSong = () => {
        // songIndex = songIndex + 1;
        console.log("Song index", songIndex, "songs list length", props.songsList.length);
        // document.querySelector("#root > div.next-song > midi-player").shadowRoot.querySelector("div > button").click();
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


    // if(songIndex == i){
    //     [styles.displayMidiPlayer, styles.i]                                
    // } 
    // else if(songIndex == i + 1){
    //     [styles.hiddenMidiPlayer, styles.nextMidiPlayer, styles.i]
    // }
    // else {
    //     [styles.hiddenMidiPlayer, styles.i]
    // }

    // useEffect(() => {

    // }
    // )

    return(
        <>
            <div id="super">
                <h1 className="testclass" id="special"> Current song {props.songsList[songIndex].title}</h1>
                <h2> Current link {props.songsList[songIndex].midiLink}</h2>
                <h3> Current index {songIndex}</h3>
            </div>
{/* 
            <div className="current-song">
                <midi-player
                    src={props.songsList[songIndex].midiLink}
                    playing
                    loop
                >  
                </midi-player>
            </div>
            <div className={styles.nextSong}>
                <midi-player
                    src={props.songsList[songIndex + 1].midiLink}
                    playing
                    loop
                >  
                </midi-player>
            </div> */}


            <div>
                {/* <h1> Test </h1> */}
                <h2> Test </h2>
                <h2> Test2 </h2>
                {props.songsList.map((s, i) => { return(
                    // <div className={ songIndex == i ? styles.displayMidiPlayer : styles.hiddenMidiPlayer } key={i}>
                    <div className={ classNames.bind(styles)({
                        "midiPlayer": true,
                        "displayMidiPlayer": songIndex == i,
                        "nextMidiPlayer": songIndex == i-1, 
                        "hiddenMidiPlayer": songIndex != i
                    }) } key = {i}>
                        {/* <h2>In map!</h2>
                        <h3>{s.title}</h3>
                        <h3> i </h3>
                        <h3> {i} </h3> 
                        <h4> song index</h4>
                        <h4> {songIndex} </h4> */}
                            {/* {i} song index {songIndex} </h3> */}
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