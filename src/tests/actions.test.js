import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';
import * as types from '../actions/types';
import { songsRef } from '../services/firebase';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const data = [1, 2, 3, 4];
const snapshot = {
    val: () => data
};

beforeAll(() => {
    jest.spyOn(songsRef, 'on').mockImplementation((value, callback) => {
        callback(snapshot);
    });
})

test('creates FETCH_SONGS when fetching songs has been done', () => {
    const expectedActions = [
        { type: types.FETCH_SONGS, payload: data }
    ];
    const store = mockStore({ songs: [] })
    return store.dispatch(actions.fetchSongs()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    })
})
