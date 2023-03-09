/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import NavBar from '../components/NavBar';
import SineWave from '../components/SineWave';
// import Canvas from '../components/Canvas';

// import Wave from '../components/Wave';
interface Artist {
  id: number;
  firstName: string;
  lastName: string;
}

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
    <div className="h-auto bg-yellow-400">
      <NavBar></NavBar>
      <div id="sine-wave-window" className="row-span-2">
        <SineWave></SineWave>
      </div>
      {/* <h2>Test</h2>
      <div id="sine-wave-window-2" className="row-span-2">
        <SineWave></SineWave>
      </div> */}
      <div className="flex min-h-screen justify-center">
        <div className="grid grid-rows-6 max-w-3xl min-w-[60%] max-h-screen">
          <div className="row-span-2 grid grid-rows-3 w-full place-items-center text-center">
            <div className="row-span-1">
              <h1>Welcome to TuneTest!</h1>
            </div>
          </div>
          {/* <nav> */}

          {/*          
          <div className="row-span-3 grid grid-rows-3 w-4/5 bg-white h-full">
            
        
              
            <div className="row-span-1 w-3/5 bg-lime-500 h-full">
              <h1>test 1</h1>
            </div>
            <div className="row-span-1 w-3/5 bg-lime-500 h-full">
              <h1>test 2</h1>
            </div>
            <div className="row-span-1 w-3/5 bg-lime-500 h-full">
              <h1>test 3</h1>
            </div>


          </div> */}

          <nav className="row-span-4 grid grid-rows-3 h-full">
            {data.allArtists.map((artist: Artist, i: number) => {
              return (
                <div className="row-span-1" key={i}>
                  <div className="bg-black mx-auto lg:h-5/6 lg:w-1/3 sm:h-5/6 sm:w-1/4 h-2/3 w-1/2 rounded-md overflow-hidden group">
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
                      className="object-contain scale-100 hover:scale-125 ease-in duration-500"></img>
                    <div className="w-full h-full bg-black object-contain scale-100 hover:scale-125 ease-in duration-500">
                      <h1>Test</h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
          {/* </nav> */}
        </div>
      </div>
      <div id="sine-wave-window" className="row-span-2">
        <SineWave></SineWave>
      </div>
    </div>
  );
}
