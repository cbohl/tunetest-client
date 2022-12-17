/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom/client";
import GuessingGame from "./components/GuessingGame";
import "./index.css"
import "html-midi-player";

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

const createGameList = function (songList) {
    songList.forEach(function(song){song.isCorrectlyGuessed = false, song.isCurrent = false});
    songList[0].isCurrent = true;
    return songList;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <GuessingGame songsList={createGameList(beatlesSongsList)} />
    </React.StrictMode>
);