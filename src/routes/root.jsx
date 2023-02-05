import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import NavBar from '../components/NavBar';

const GET_ARTISTS = gql`
  query allArtists {
    allArtists {
      lastName
    }
  }
`;

export default function Root() {
  const { data, loading, error } = useQuery(GET_ARTISTS);

  if (loading == true) {
    return <h1>Loading!</h1>;
  } else if (error) {
    return <h1>GraphQL query error!</h1>;
  }
  return (
    <div>
      <NavBar></NavBar>
      <div className="flex min-h-screen justify-center">
        <div className="grid max-w-3xl min-w-[60%] max-h-screen grid-rows-4 text-center">
          <h1 className="rows-span-1">Welcome to TuneTest!</h1>
          <nav>
            <ul className="grid grid-rows-3 max-h-screen mx-auto">
              {data.allArtists.map((artist, i) => {
                return (
                  <li className="rows-span-1" key={i}>
                    <div className="mx-auto block lg:h-5/6 lg:w-1/3 sm:h-5/6 sm:w-1/4 h-2/3 w-1/2 rounded-md overflow-hidden group">
                      <div className="absolute my-auto justify-center items-center left-1/2 transform -translate-x-1/2 z-30 hidden group-hover:block">
                        <Link
                          to={'games/' + (i + 1)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Play The {artist.lastName} Game
                        </Link>
                      </div>
                      <img
                        src={
                          process.env.REACT_APP_API_URL +
                          '/static/images/' +
                          artist.lastName +
                          '2.webp'
                        }
                        className="object-cover scale-100 hover:scale-125 ease-in duration-500 z-10"></img>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
