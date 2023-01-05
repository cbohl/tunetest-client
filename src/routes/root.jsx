/* eslint-disable */
import { Link } from "react-router-dom";


export default function Root() {
    return (
      <div className="flex min-h-screen justify-center">
        <div className="grid max-w-3xl min-w-[60%] max-h-screen grid-rows-4 text-left">
          <h1 className="rows-span-1">Welcome to the Music Guessing App!</h1>
          <nav className="rows-span-3">
            <ul className="grid grid-rows-3 max-h-screen mx-auto">
              <li className="rows-span-1">
                <Link to={`games/1`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play The Beatles Game</Link>
                <img src= {"http://localhost:5000/images/" + "Beatles" + "2.webp"} className="h-full"></img>
              </li>
              <li className="rows-span-1">
                <Link to={'games/2'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play The Backstreet Boys Game</Link>
                <img src= {"http://localhost:5000/images/" + "Backstreet Boys" + "2.webp"} className="h-full"></img>
              </li>
              <li className="rows-span-1 object-contain">
                <Link to={'games/3'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play The Easy Songs Game</Link>
                <img src= {"http://localhost:5000/images/" + "Songs" + "2.webp"} className="h-full"></img>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }