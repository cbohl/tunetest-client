/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./error-page";

import Contact from "./routes/contact";

import GuessingGame from "./components/GuessingGame";
import Root from "./routes/root";

// import App from "./components/App";
import "./index.css"
import "html-midi-player";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />
    },
    {
        path: "contacts/:contactId",
        element: <Contact />,
    },
    {
        path: "games/:gameId",
        element: <GuessingGame />
    }
  ]);

// class Song {
//     constructor(title, midiLink) {
//         this.title = title;
//         this.midiLink = midiLink;
//     }
// }


// const SONGS = gql`
//   query GetSongs {
//     songs {
//       id
//       title
//     }
//   }
// `;

// console.log(SONGS);





// let song1 = new Song("Hey Jude", "https://bitmidi.com/uploads/16427.mid");
// let song2 = new Song("Eight Days a Week", "https://bitmidi.com/uploads/16425.mid");
// let song3 = new Song("With a Little Help from My Friends", "https://bitmidi.com/uploads/16431.mid");

// let beatlesSongsList = [song1, song2, song3]; 

// const createGameList = function (songList) {
//     songList.forEach(function(song){song.isCorrectlyGuessed = false, song.isCurrent = false});
//     songList[0].isCurrent = true;
//     return songList;
// };

const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache()
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
            {/* <GuessingGame /> */}
        </ApolloProvider>
    </React.StrictMode>
);