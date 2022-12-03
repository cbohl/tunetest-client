import React, {useState} from "react";
import GuessSong from "./GuessSong";

const GuessingGame = () => {
    let songsList = ["And Your Bird Can Sing", "Yesterday", "Ticket to Ride"];
    let [songIndex, setSongIndex] = useState(0);
    
    const nextSong = () => {
        // songIndex = songIndex + 1;
        console.log("Song index", songIndex, "songs list length", songsList.length);
        if(songIndex < songsList.length -1){
            console.log("instide");
            setSongIndex(songIndex + 1);
        }else
            alert("Out of songs!");
    };

    return(
        <GuessSong songTitle={songsList[songIndex]} nextSong={nextSong}/>
    );
};

export default GuessingGame;