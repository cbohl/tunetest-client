/* eslint-disable */
import { Link } from "react-router-dom";


export default function Root() {
    return (
      <>
          <nav>
            <ul>
              <li>
                <Link to={`games/1`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play The Beatles Game</Link>
              </li>
              <li>
                <Link to={'games/2'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play The Backstreet Boys Game</Link>
              </li>
              <li>
                <Link to={'games/3'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play The Easy Songs Game</Link>
              </li>
            </ul>
          </nav>
      </>
    );
  }