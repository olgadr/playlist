import { FETCH_SONGS, SET_CURRENT_SONG_INDEX } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_SONGS:
            return Object.assign({}, state, {
                songs: action.payload
            });
        case SET_CURRENT_SONG_INDEX:
            return Object.assign({}, state, {
                currentIndex: action.payload
            });

        default:
            return state;
    }
};