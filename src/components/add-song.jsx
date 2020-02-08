import React, { useRef } from 'react';
import { handleAddSong } from '../services/firebase';
import { connect } from 'react-redux';
import '../styles/add-song.scss';

function AddSong({ songsList }) {
    const songIndex = songsList ? songsList.length : 0;
    const inputRef = useRef(null);

    const onSongAdded = () => {
        const songUrl = inputRef.current.value.toString();
        if (songUrl) {           
            handleAddSong({ url: songUrl, id: songIndex });
            inputRef.current.value = '';
        }
    }

    return (
        <div className="add-song">
            <input
                data-testid="text-input"
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
            <button
                data-testid="button-add"
                onClick={onSongAdded}
            >
                Add
            </button>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { songs } = state;
    return { songsList: songs }
}

export default connect(mapStateToProps)(AddSong);