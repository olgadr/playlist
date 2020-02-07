import React, { useState } from 'react';
import { addSong } from '../actions';
import { connect } from 'react-redux';
import '../styles/add-song.scss';

function AddSong({dispatch, songsList}) {
    const [value, setValue] = useState('');
    const id = songsList ? songsList.length : 0;

    return (
        <div className="add-song">
            <input 
                type="text" 
                placeholder="Enter Video Id" 
                value={value}
                onChange={(event) => { setValue(event.target.value); }} 
                onKeyPress={(event) => {
                    if (event.charCode === 13) {
                        dispatch(addSong({url: event.target.value, id}));
                    }
                    setValue('');
                }}
            />
            <button onClick={() => { 
                dispatch(addSong({ url: value, id })); 
                setValue('');
            }}>Add</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { currentIndex, songs } = state;
    return { currentIndex, songsList: songs }
}

export default connect(mapStateToProps)(AddSong);