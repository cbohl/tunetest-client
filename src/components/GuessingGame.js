/* eslint-disable */

// import React, {useState, useEffect} from "react";
import React, {useState} from "react";
import PropTypes from "prop-types";
import GuessSong from "./GuessSong";
import "html-midi-player";


const GuessingGame = (props) => {
    let songsListBeta = ["And Your Bird Can Sing", "Yesterday", "Ticket to Ride"];
    let [songIndex, setSongIndex] = useState(0);

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
    
    const nextSong = () => {
        // songIndex = songIndex + 1;
        console.log("Song index", songIndex, "songs list length", props.songsList.length);
        if(songIndex < props.songsList.length -1){
            console.log("inside");
            setSongIndex(songIndex + 1);
        }else
            alert("Out of songs!");
    };

    // useEffect(() => {

    // }
    // )

    return(
        <>
            {/* <h1> Current song {props.songsList[songIndex].title}</h1>
            <h2> Current link {props.songsList[songIndex].midiLink}</h2>
            <h3> Current index {songIndex}</h3>
            <midi-player
                src={props.songsList[songIndex].midiLink}
            >  
            </midi-player> */}
            <GuessSong songTitle={props.songsList[songIndex].title} nextSong={nextSong}/>
        </>
    );
};

GuessingGame.propTypes = {
    songsList: PropTypes.array
};

export default GuessingGame;