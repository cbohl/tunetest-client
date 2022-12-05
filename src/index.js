import React from "react";
import ReactDOM from "react-dom/client";
import GuessingGame from "./components/GuessingGame";
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <midi-player
            src="https://magenta.github.io/magenta-js/music/demos/melody.mid"
        >
        </midi-player>
        {/* <midi-player
            src="./public/Guns_n_Roses_-_Paradise_City.mid"
        >
        </midi-player> */}
        {/* <midi-player visualizer="#myVisualizer, #myOtherVisualizer"></midi-player> */}
        <GuessingGame />
        {/* <GuessSong songTitle={songTitle} nextSong={nextSong}/> */}
        {/* <h2>Current Song {songTitle}</h2> */}
    </React.StrictMode>
);