/* eslint-disable */
/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom/client";
import GuessingGame from "./components/GuessingGame";
import "./index.css"
import "html-midi-player";

// console.log(MidiPlayer);
// import GuessSong from "./components/GuessSong";

// const songsList = ["And Your Bird Can Sing", "Yesterday", "Ticket to Ride"];
// const songTitle=songsList[1];
// const correctGuess = false;
// console.log(songsList);

// for(i; 0; songsList.length -1){
//     songTitle = songsList[i];

// }

// playGuessingGame();

// let songIndex = 0;
// let songsList = ["And Your Bird Can Sing", "Yesterday", "Ticket to Ride"];
// let songTitle = songsList[0];
// console.log("song at top", songTitle);
// const nextSong = () => {
//     songIndex = songIndex + 1;
//     songTitle = songsList[songIndex];
//     console.log("next song", songTitle);
// };

class Song {
    constructor(title, midiLink) {
        this.title = title;
        this.midiLink = midiLink;
    }
}

let song1 = new Song("Hey Jude", "https://bitmidi.com/uploads/16427.mid");
let song2 = new Song("Eight Days a Week", "https://bitmidi.com/uploads/16425.mid");
let song3 = new Song("With a Little Help from My Friends", "https://bitmidi.com/uploads/16431.mid");

let beatlesSongsList = [song1, song2, song3]; 

// debugger;

const createGameList = function (songList) {
    // return(
    //     songList.map( () => {
    //     if(i==0){
    //         songList.isCurrentSong = true;
    //     } else {
    //         songList.isCurrentSong = false;
    //     }
    //         song * 2;
    //     }

    // );
    songList.forEach(function(song){song.isCorrectlyGuessed = false, song.isCurrent = false});
    songList[0].isCurrent = true;
    console.log(songList);
    return songList;
};

console.log("list", createGameList(beatlesSongsList));


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* <midi-player
            src="https://bitmidi.com/uploads/112561.mid"
        >
        </midi-player> */}
        {/* <midi-player
            src="public/ParadiseCity.mid"
        >
        </midi-player> */}
        {/* <midi-player visualizer="#myVisualizer, #myOtherVisualizer"></midi-player> */}
        <GuessingGame songsList={createGameList(beatlesSongsList)} />
        {/* <GuessSong songTitle={songTitle} nextSong={nextSong}/> */}
        {/* <h2>Current Song {songTitle}</h2> */}
    </React.StrictMode>
);