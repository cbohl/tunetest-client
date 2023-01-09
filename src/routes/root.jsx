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
                    <Link to={ "games/" + (i + 1) } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play The {artist.lastName} Game</Link>
                    <img src= {"http://localhost:5000/images/" + artist.lastName + "2.webp"} className="mx-auto h-full"></img>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    );
  }