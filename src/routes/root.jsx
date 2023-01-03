/* eslint-disable */
import { Link } from "react-router-dom";


export default function Root() {
    return (
      <>
          <nav>
            <ul>
              <li>
                <Link to={`game`}>Play The Beatles Game</Link>
              </li>
              <li>
                <a href={`contacts/2`}>Play The Backstreet Boys Game</a>
              </li>
              <li>
                <a href={'contacts/3'}>Play The Easy Songs Game</a>
              </li>
            </ul>
          </nav>
      </>
    );
  }