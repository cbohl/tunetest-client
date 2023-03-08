# TuneTest

## Summary

TuneTest is a web app for guessing the names of popular songs based on a MIDI rendition. Players can choose an artist and then they will be given three songs sequentially and can guess the name of each song. After the game is complete, users have the option to enter a username to save with their score, in the style of an old arcade game.

(This repo is the client side only. To see the source code for the API, please go to https://github.com/cbohl/tunetest-api.)

## Technologies Used

### Client

- React
- Tailwind.css
- TypeScript formatted with ESLint and Prettier
- Create-React-App
- GraphQL
- Hosted via Netlify

### API

- Docker
- Express.js
- Postgres
- Node.js
- TypeScript formatted with ESLint and Prettier
- GraphQL
- Hosted via Fly.io

## Challenges and Techniques

- This project uses the HTML-Midi-Player Node Module to play songs. The songs need to start automatically after a correct guess is made or the skip button is pressed. Therefore, programmatic clicks are used to trigger the songs.
- Google Chrome's AudioContext feature requires audio events to occur as a direct result of user action. As a result, the use of reloading components through React DOM manipulation would prevent the automatic playing in Chrome. To work around this, the app preloads all songs required throughout the game but hides from view those that are not in the current round.
- HTML-Midi-Player includes a component with a custom tag. As a result, TypesScript could not identify the component type and it was necessary to identify it as a custom HTML Element and add custom HTML attributes.
- In order to make it easy to add new artists, the artist information, photos, song titles, and MIDI tracks are all hosted on the API. The client can then dynamically render as many artists that are on the database.

## Feature Wishlist

- A more sophisticated scoring system
- More artists and songs
- Keyboard accessibility when selecting a game on the index page
