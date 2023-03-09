/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import NavBar from '../components/NavBar';
import SineWave from '../components/SineWave';
import SineWave2 from '../components/SineWave2';
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
    <div className="h-auto bg-[#8A6464]">
      <NavBar></NavBar>
      <div id="sine-wave-window" className="row-span-2">
        <SineWave></SineWave>
      </div>
      {/* <h2>Test</h2>
      <div id="sine-wave-window-2" className="row-span-2">
        <SineWave></SineWave>
      </div> */}
      <div className="flex justify-center bg-black w-4/5">
        <div className="grid grid-rows-6 w-full max-h-screen">
          <div className="row-span-1 grid place-items-center">
            {/* <div>
              <h1>Welcome to TuneTest!</h1>
            </div> */}
            {/* <div className="w-1/4  "> */}
            <div>
              <img src={'/tunetestlogo.png'} className="w-60"></img>
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

          <nav className="row-span-5 grid grid-rows-3 h-full w-full">
            {data.allArtists.map((artist: Artist, i: number) => {
              return (
                <div className="row-span-1" key={i}>
                  <div className="mx-auto block xl:w-1/5 lg:h-5/6 lg:w-1/4 sm:h-5/6 sm:w-1/4 h-2/3 w-1/2 rounded-md overflow-hidden group">
                    <div className="absolute my-auto justify-center items-center left-1/2 transform -translate-x-1/2 z-30 hidden group-hover:blockabsolute my-auto justify-center items-center left-1/2 transform -translate-x-1/2 z-30 hidden group-hover:block">
                      <Link
                        to={'games/' + (i + 1)}
                        className="flex flex-col items-center text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
                  </div>
                </div>
              );
            })}
          </nav>
          {/* </nav> */}
        </div>
      </div>
      <div id="sine-wave-window-2" className="row-span-2">
        <SineWave2></SineWave2>
      </div>
    </div>
  );
}
