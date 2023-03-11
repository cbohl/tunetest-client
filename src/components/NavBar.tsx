import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMusic, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <nav className="w-screen bg-cloud h-14 grid">
      <div className="m-auto flex-1 flex">
        <a href={'/'}>
          <div>
            <img src={'/tunetesticon.png'} className="h-10"></img>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
