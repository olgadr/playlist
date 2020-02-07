import React, { useRef } from 'react';
import { addSong } from '../actions';
import { connect } from 'react-redux';
import '../styles/add-song.scss';

function AddSong({ dispatch, songsList }) {
    const songIndex = songsList ? songsList.length : 0;
    const inputRef = useRef(null);
    
    const onSongAdded = () => {
        const songUrl = inputRef.current.value;
        if (songUrl) {
            dispatch(addSong({ url: songUrl, id: songIndex }));
            inputRef.current.value = '';
        }
    }

    return (
        <div className="add-song">
            <input
                type="text"
                placeholder="Enter Video URL"
                defaultValue=''
                ref={inputRef}
                onKeyPress={(event) => {
                    if (event.charCode === 13) {
                        onSongAdded();
                    }
                }}
            />
            <button onClick={onSongAdded}>Add</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { currentIndex, songs } = state;
    return { currentIndex, songsList: songs }
}

export default connect(mapStateToProps)(AddSong);