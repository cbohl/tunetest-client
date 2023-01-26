import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import toast, { Toaster } from 'react-hot-toast';
import GameWelcome from './GameWelcome.tsx';
import GuessSong from './GuessSong';
import GameComplete from './GameComplete.tsx';
import styles from './GuessingGame.module.css';
import 'html-midi-player';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_ARTIST_INFO = gql`
  query getArtistInfo($id: Int) {
    getArtistInfo(id: $id) {
      firstName
      lastName
      songs {
        title
        midiFilePath
      }
    }
  }
`;

const GuessingGame = (props) => {
  let [songIndex, setSongIndex] = useState(0);
  let [gameStart, setGameStart] = useState(false);
  let [gameOver, setGameOver] = useState(false);
  let [songs, setSongs] = useState([]);
  let [artist, setArtist] = useState();
  let { gameId } = useParams();

  const { data, loading, error } = useQuery(GET_ARTIST_INFO, {
    variables: { id: parseInt(gameId) },
  });

  useEffect(() => {
    if (loading === false && data) {
      let updatedSongs = data.getArtistInfo.songs.map((item) => ({
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
    document
      .querySelector('.NextMidiPlayer > Midi-player')
      .shadowRoot.querySelector('div > button')
      .click();
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
              artist={artist}
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
                            src={
                              process.env.REACT_APP_API_URL +
                              '/static/' +
                              s.midiFilePath
                            }
                            loop></midi-player>
                          {/* </audio> */}
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
              artist={artist}
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
