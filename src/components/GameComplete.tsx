import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import styles from './GuessSong.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faMusic } from '@fortawesome/free-solid-svg-icons';

const GET_ARTIST_SCORE_RECORDS = gql`
  query GetArtistScoreRecords($artistId: Int) {
    getArtistScoreRecords(artistId: $artistId) {
      username
      score
    }
  }
`;

const CREATE_SCORE_RECORD = gql`
  mutation CreateScoreRecord($artistId: Int, $username: String, $score: Int) {
    createScoreRecord(artistId: $artistId, username: $username, score: $score) {
      artistId
      username
      score
    }
  }
`;

interface Song {
  title: string;
  midiFilePath: string;
  isCurrent: boolean;
  isCorrect: boolean;
}

interface Artist {
  id: number;
  firstName: string;
  lastName: string;
  songs: Song[];
}

interface ScoreRecord {
  artistId: number;
  username: string;
  score: number;
}

const GameComplete = ({
  artist,
  songsList,
  gameOver,
}: {
  artist: Artist;
  songsList: Song[];
  gameOver: boolean;
}) => {
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_ARTIST_SCORE_RECORDS, {
    variables: { artistId: artist.id },
  });
  const [createScoreRecord] = useMutation(CREATE_SCORE_RECORD);
  let [scoreRecords, setScoreRecords] = useState<ScoreRecord[]>([]);
  let [username, setUsername] = useState('');
  let [scoreSubmitted, setScoreSubmitted] = useState(false);

  const totalGuessesCorrect = () => {
    let numberCorrect = 0;
    (songsList as Song[]).forEach((song: Song) => {
      if (song.isCorrect) {
        numberCorrect++;
      }
    });
    return numberCorrect;
  };

  const submitScore = () => {
    createScoreRecord({
      variables: {
        artistId: artist.id,
        username: username,
        score: totalGuessesCorrect(),
      },
    });
    let updatedScoreRecords = scoreRecords;
    updatedScoreRecords.push({
      username: username,
      score: totalGuessesCorrect(),
      artistId: artist.id,
    });
    updatedScoreRecords = updatedScoreRecords
      .slice()
      .sort((a: ScoreRecord, b: ScoreRecord) => {
        return a.score < b.score ? 1 : -1;
      });
    setScoreRecords(updatedScoreRecords);
    setScoreSubmitted(true);
  };

  const handleScoreSubmit = () => {
    submitScore();
  };

  const downHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleScoreSubmit();
    }
  };

  useEffect(() => {
    if (queryLoading === false && queryData && !queryError) {
      let orderedScoreRecords = queryData.getArtistScoreRecords
        .slice()
        .sort((a: ScoreRecord, b: ScoreRecord) => {
          return a.score < b.score ? 1 : -1;
        });

      orderedScoreRecords = orderedScoreRecords.slice(0, 10);
      setScoreRecords(orderedScoreRecords);
    }
  }, [queryData]);

  if (gameOver) {
    return (
      <>
        <div className="flex min-h-screen justify-center">
          <div className="grid max-w-3xl min-w-[60%] max-h-screen grid-rows-3 text-center">
            <div className="rows-span-1">
              <div>
                <div className="mt-5">
                  <h4>Guesses Correct</h4>
                  <h1>{totalGuessesCorrect()}</h1>
                </div>
              </div>
              <div>
                <h1>Thanks for playing!</h1>
              </div>
              <div className="my-5">
                <a
                  href={'/'}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Go back to home page
                </a>
              </div>
            </div>
            {!scoreSubmitted ? (
              <div className="rows-span-1">
                <h1>Submit your score!</h1>
                <div>
                  <input
                    id="score-submit-text"
                    className={styles.FormInput}
                    type="text"
                    name="Score Submit"
                    placeholder="ENTER YOUR USERNAME HERE"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      downHandler(e);
                    }}></input>
                </div>
                <div
                  id="song-guess-submit-container"
                  className="grid place-items-center">
                  {!username ? (
                    <div
                      id="EmptyUsernameButton"
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded w-3/4">
                      <FontAwesomeIcon icon={faMusic} />
                    </div>
                  ) : (
                    <div
                      id="ScoreSubmitButton"
                      className={
                        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-3/4 cursor-pointer'
                      }
                      onClick={() => handleScoreSubmit()}>
                      <FontAwesomeIcon icon={faArrowUp} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rows-span-1">
                <div className="mx-auto block lg:h-5/6 lg:w-1/3 sm:h-5/6 sm:w-1/4 h-2/3 w-1/2 rounded-md overflow-hidden group">
                  <img
                    src={
                      process.env.REACT_APP_API_URL +
                      '/static/images/' +
                      artist.lastName +
                      '2.webp'
                    }
                    className="object-cover scale-100 z-10"></img>
                </div>
              </div>
            )}
            <div>
              {scoreRecords.map((record: ScoreRecord) => {
                return (
                  <>
                    <h1>
                      {record.username} {record.score}
                    </h1>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default GameComplete;
