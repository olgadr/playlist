import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSongs, removeSong } from '../actions';
import '../styles/playlist.scss';

function Playlist({ currentIndex, songsList, dispatch }) {
    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);

    return (
        <div className="playlist-wrapper" data-testid="playlist-wrapper">
            {songsList && (
                songsList.map((song, index) =>
                    (
                        <div 
                            className={`playlist-row ${index === currentIndex ? 'current' : ''}`} 
                            key={song.url}
                            data-testid={`${index === currentIndex ? 'current-row' : 'playlist-row'}`}
                        >
                            
                            <div className="playlist-item">
                                {song.url}
                            </div>
                            <div className="playlist-button">
                                <button onClick={() => dispatch(removeSong(song.id)) }>Remove</button>
                            </div>
                        </div>
                    ))
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    const { currentIndex, songs } = state;
    return { currentIndex, songsList: songs }
}

export default connect(mapStateToProps)(Playlist)