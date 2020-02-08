import * as types from '../actions/types';
import reducer from '../reducers';

const data = [1, 2, 3, 4];
const initialState = {
    songs: [],
    currentIndex: 0
};

test('FETCH_SONGS action type', () => {
    const action = { type: types.FETCH_SONGS, payload: data };
    const newState = reducer(initialState, action);

    expect(newState).toEqual({
        songs: data,
        currentIndex: 0
    });
})

test('SET_CURRENT_SONG_INDEX action type', () => {
    const action = { type: types.SET_CURRENT_SONG_INDEX, payload: 2 };
    const newState = reducer(initialState, action);

    expect(newState).toEqual({
        songs: [],
        currentIndex: 2
    });
})