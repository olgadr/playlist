import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { removeSong } from '../actions';

function Player({ currentIndex, songs, dispatch }) {
  const [song, setSongItem] = useState(null);

  useEffect(() => {
    if (songs && songs[currentIndex]) {
      const item = songs[currentIndex];
      if (item && item.url) {
        setSongItem(item);
      }
    } else {
      setSongItem(null);
    }

  }, [currentIndex, songs]);

  return (
    song &&    
    <ReactPlayer
      data-testid="react-player"
      url={song.url}
      controls
      playing
      onEnded={() => {       
        dispatch(removeSong(song.id))        
      }}
    />
  );
}

const mapStateToProps = (state) => {
  const { currentIndex, songs } = state;
  return { currentIndex, songs }
}

export default connect(mapStateToProps)(Player);