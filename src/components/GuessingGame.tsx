/* eslint-disable */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import toast, { Toaster } from 'react-hot-toast';
import GameWelcome from './GameWelcome';
import GuessSong from './GuessSong';
import GameComplete from './GameComplete';
// import * as MidiPlayer from './SuperMidiPlayer.js';
import styles from './GuessingGame.module.css';
import 'html-midi-player';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'midi-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

declare module 'react' {
  export interface HTMLAttributes<T> {
    src?: any;
    loop?: any;
  }
}
// interface extends HTMLAttributes<T> {
//   // extends React's HTMLAttributes
//   src?: string;
// }

// const SpecialPlayer =

const GET_ARTIST_INFO = gql`
  query getArtistInfo($id: Int) {
    getArtistInfo(id: $id) {
      id
      firstName
      lastName
      songs {
        title
        midiFilePath
      }
    }
  }
`;

const GuessingGame = (props: any) => {
  let [songIndex, setSongIndex] = useState(0);
  let [gameStart, setGameStart] = useState(false);
  let [gameOver, setGameOver] = useState(false);
  let [songs, setSongs] = useState([] as any[]);
  let [artist, setArtist] = useState();
  let { gameId } = useParams();

  const { data, loading, error } = useQuery(GET_ARTIST_INFO, {
    variables: { id: parseInt(gameId!) },
  });

  useEffect(() => {
    if (loading === false && data) {
      let updatedSongs = data.getArtistInfo.songs.map((item: any) => ({
        ...item,
        isCorrectlyGuessed: false,
        isCurrent: false,
      }));
      setSongs(updatedSongs);
      setArtist(data.getArtistInfo);
    }
  }, [data]);

  const toastCorrectGuess = () => toast('Good guess!');
  const toastIncorrectGuess = () => toast('Incorrect guess!');

  const clickPlay = () => {
    const realDoc = document;

    if (realDoc) {
      const midiPlayer = realDoc.querySelector('.NextMidiPlayer > Midi-player');
      if (midiPlayer) {
        const shadowButton = midiPlayer.shadowRoot;
        if (shadowButton) {
          const playButton: any = shadowButton.querySelector('div > button');
          if (playButton !== null) {
            playButton.click();
          }
        }
      }
    }
  };

  const nextSong = () => {
    songs[songIndex].isCorrect = true;

    if (songIndex < songs.length - 1) {
      clickPlay();
      setSongIndex(songIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const skipSong = () => {
    if (songIndex < songs.length - 1) {
      clickPlay();
      setSongIndex(songIndex + 1);
    } else setGameOver(true);
  };

  return (
    <div>
      <div>
        {songs.length > 0 ? (
          <div>
            <GameWelcome
              artist={artist!}
              setGameStart={setGameStart}
              gameStart={gameStart}></GameWelcome>

            <div
              className={classNames.bind(styles)({
                MainGame: true,
                Hidden: !gameStart || gameOver,
              })}>
              <Toaster />
              <div className="flex min-h-screen justify-center">
                <div className="grid max-h-72 min-h-screen min-w-[100%] grid-rows-4 text-center gap-4">
                  <div className="mt-10">
                    {songs.map((s, i) => {
                      const allowedProps = {
                        src:
                          process.env.REACT_APP_API_URL +
                          '/static/' +
                          s.midiFilePath,
                      };
                      return (
                        <div
                          className={classNames.bind(styles)({
                            MidiPlayer: true,
                            DisplayMidiPlayer: songIndex == i,
                            NextMidiPlayer: songIndex == i - 1,
                            HiddenMidiPlayer: songIndex != i,
                          })}
                          key={i}>
                          {/* <audio> */}
                          <midi-player
                            // {...allowedProps}
                            src={
                              process.env.REACT_APP_API_URL +
                              '/static/' +
                              s.midiFilePath
                            }
                            loop></midi-player>
                          {/* </audio> */}
                          {/* <MidiPlayer */}
                          {/* midiFilePath={s.midiFilePath}></MidiPlayer> */}
                        </div>
                      );
                    })}
                  </div>
                  <div className="content-around">
                    <GuessSong
                      songTitle={songs[songIndex].title}
                      nextSong={nextSong}
                      toastCorrectGuess={toastCorrectGuess}
                      toastIncorrectGuess={toastIncorrectGuess}
                    />
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={skipSong}>
                      Skip Song
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <GameComplete
              artist={artist!}
              songsList={songs}
              gameOver={gameOver}></GameComplete>
          </div>
        ) : (
          <h1>Loading data</h1>
        )}
      </div>
    </div>
  );
};

GuessingGame.propTypes = {
  songsList: PropTypes.array,
};

export default GuessingGame;
