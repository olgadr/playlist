import React from 'react';
import AddSong from './components/add-song';
import Playlist from './components/playlist';
import Player from './components/player';
import './styles/app.scss';

function App() {
  return (
    <div className="app">
      <div className="app-column">
        <AddSong />
        <Playlist />
      </div>
      <div className="app-column">
        <Player />
      </div>
    </div>
  );
}

export default App;
