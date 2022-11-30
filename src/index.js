import React from 'react';
import ReactDOM from 'react-dom/client';
import GuessSong from './components/GuessSong';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>Test!</h1>
    <GuessSong/>
  </React.StrictMode>
);