import { FETCH_SONGS, SET_CURRENT_SONG_INDEX } from './types';
import { songsRef, database } from '../services/firebase';

export const addSong = ({url, id}) => async dispatch => {
    const newSong = {
        id,
        url
    };
    songsRef.child(id).set(newSong);
};

export const setCurrentIndex = index => dispatch => {
    dispatch({
        type: SET_CURRENT_SONG_INDEX,
        payload: index
    });
};

export const removeSong = (songId) => async dispatch => {
    const itemRef = database.ref(`/songs/${songId}`);
    itemRef.remove();
}

export const fetchSongs = () => async dispatch => {   
    songsRef.on("value", function (snapshot) {
        const data = snapshot.val();
        dispatch({
            type: FETCH_SONGS,
            payload: data ? Object.values(data) : null
        });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};
