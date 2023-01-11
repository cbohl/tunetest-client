/* eslint-disable */
import { Link } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";



const GET_ARTISTS = gql`
query allArtists {
    allArtists {
        lastName
    }
}`;



export default function Root() {
    const { data, loading, error } = useQuery(GET_ARTISTS);
    if(loading == true){return(<h1>Loading!</h1>)}
    // else debugger
    return (
      <div className="flex min-h-screen justify-center">
        <div className="grid max-w-3xl min-w-[60%] max-h-screen grid-rows-4 text-center">
          <h1 className="rows-span-1">Welcome to the Music Guessing App!</h1>
          <nav>
            <ul className="grid grid-rows-3 max-h-screen mx-auto">
              {data.allArtists.map((artist, i) => {
                return(
                  <li className="rows-span-1" key={i}>
                    <Link to={ "games/" + (i + 1) } className="">
                      <div className="mx-auto h-30 w-40 overflow-hidden">
                        <div className="absolute z-30">
                          <h1 className="absolute text-green-800 font-bold">Play The {artist.lastName} Game</h1>
                        </div>
                        <img src= {"http://localhost:5000/images/" + artist.lastName + "2.webp"} className="scale-100 hover:scale-125 ease-in duration-500 z-10"></img>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    );
  }