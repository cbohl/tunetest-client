// import React, {useState, useEffect} from "react";
import React, {useState} from "react";
import GuessSong from "./GuessSong";
import "html-midi-player";


const GuessingGame = () => {
    // let songsList = ["And Your Bird Can Sing", "Yesterday", "Ticket to Ride"];
    let [songIndex, setSongIndex] = useState(0);

    class Song {
        constructor(title, midiLink) {
            this.title = title;
            this.midiLink = midiLink;
        }
    }

    let song1 = new Song("Hey Jude", "https://bitmidi.com/uploads/16427.mid");
    let song2 = new Song("Eight Days a Week", "https://bitmidi.com/uploads/16425.mid");
    let song3 = new Song("Penny Lane", "https://bitmidi.com/beatles-penny-lane-2-k-mid#:~:text=Download%20BEATLES.Penny%20lane%202%20k.mid");

    let songsList = [song1, song2, song3]; 
    // let songLink = "";   
    
    const nextSong = () => {
        // songIndex = songIndex + 1;
        console.log("Song index", songIndex, "songs list length", songsList.length);
        if(songIndex < songsList.length -1){
            console.log("instide");
            setSongIndex(songIndex + 1);
        }else
            alert("Out of songs!");
    };

    // useEffect(() => {

    // }
    // )

    return(
        <>
            <h1> Current song {songsList[songIndex].title}</h1>
            <h2> Current link {songsList[songIndex].midiLink}</h2>
            <midi-player
                src={songsList[songIndex].midiLink}
            >  
            </midi-player>
            <GuessSong songTitle={songsList[songIndex].title} nextSong={nextSong}/>
        </>
    );
};

export default GuessingGame;