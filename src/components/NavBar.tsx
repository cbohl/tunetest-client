import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <nav className="w-screen">
      <div className="flex-1 flex justify-center mr-auto">
        <a href={'/'} className="font-bold text-center content-center">
          <FontAwesomeIcon icon={faMusic} />
          <FontAwesomeIcon icon={faQuestionCircle} />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
