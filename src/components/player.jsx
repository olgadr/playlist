import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setCurrentIndex } from '../actions';
import YouTube from 'react-youtube';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1
  }
};

function Player({ currentIndex, songs, dispatch }) {
  const [song, setSongItem] = useState(null);

  useEffect(() => {
    if (songs && songs[currentIndex]) {
      const item = songs[currentIndex];
      if (item && item.url) {
        setSongItem(item);
      }
    }

  }, [currentIndex, songs]);

  return (
    song &&
    <YouTube
      videoId={song.url}
      opts={opts}
      onEnd={() => {
        if (currentIndex < songs.length - 1) {
          dispatch(setCurrentIndex(currentIndex + 1))
        }
      }}
    />
  );
}

const mapStateToProps = (state) => {
  const { currentIndex, songs } = state;
  return { currentIndex, songs }
}

export default connect(mapStateToProps)(Player);