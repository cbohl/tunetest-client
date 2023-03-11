import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import NavBar from '../components/NavBar';
import SineWave from '../components/SineWave';
// import SineWave2 from '../components/SineWave2';
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
    <div className="h-auto bg-rose">
      <NavBar></NavBar>
      <div id="sine-wave-window-1" className="">
        <SineWave instance={1}></SineWave>
      </div>
      <div className=" grid place-items-center">
        <div className="flex justify-center bg-rose-dark">
          <div className="grid grid-rows-6 w-full max-h-screen">
            <div className="row-span-1 grid place-items-center">
              <div className="h-auto w-full grid place-items-center bg-[#f7f7f7]">
                <a href={'/'}>
                  <img src={'/tunetestlogo.png'} className="w-60"></img>
                </a>
              </div>
            </div>

            <nav className="row-span-5 grid grid-rows-3 h-full w-full">
              <video
                id="background-video"
                autoPlay
                loop
                muted
                className="fixed mb-80 z-0 opacity-60 h-80 w-full object-cover"
                // poster="https://assets.codepen.io/6093409/river.jpg"
              >
                <source src="BeatlesRecording.mov" type="video/mp4"></source>
              </video>
              {data.allArtists.map((artist: Artist, i: number) => {
                return (
                  <div className="row-span-1" key={i}>
                    <div className="mx-auto block xl:w-1/5 lg:h-5/6 lg:w-1/4 md:w-1/3 sm:h-5/6 sm:w-1/3 h-2/3 w-1/2 rounded-md overflow-hidden group">
                      <div className="absolute my-auto justify-center items-center left-1/2 transform -translate-x-1/2 z-30 hidden group-hover:blockabsolute my-auto justify-center items-center left-1/2 transform -translate-x-1/2 z-30 hidden group-hover:block">
                        <Link
                          to={'games/' + (i + 1)}
                          className="font-white flex flex-col items-center text-center bg-cloud hover:bg-cloud-dark font-bold text-slate-50 py-2 px-4 rounded">
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
          </div>
        </div>
      </div>
      <div className="fixed block mt-80"></div>
      <div id="sine-wave-window-2" className="">
        <SineWave instance={2}></SineWave>
      </div>
    </div>
  );
}
