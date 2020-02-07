import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, getByTestId } from '@testing-library/react';
import Playlist from '../components/playlist';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

test('renders empty list', () => {
  store = mockStore({
    songs: [],
    currentIndex: 0
  });

  const { container } = render(<Provider store={store}><Playlist /></Provider>);
  const playListWrapper = getByTestId(container, 'playlist-wrapper') 
  expect(playListWrapper.childNodes.length).toEqual(0);
});

test('renders list with 3 songs and current index equals 1', () => {
  store = mockStore({
    songs: [
      {
        "id": "1",
        "url": "alHX1fJ9I-w"
      },
      {
        "id": "2",
        "url": "hkn-JAiCz2A"
      },
      {
        "id": "3",
        "url": "8aGhZQkoFbQ"
      }
    ],
    currentIndex: 1
  });

  const { container } = render(<Provider store={store}><Playlist /></Provider>);
  const playListWrapper = getByTestId(container, 'playlist-wrapper');
  expect(playListWrapper.childNodes.length).toEqual(3);

  const currentRow = getByTestId(container, 'current-row');
  expect(currentRow.childNodes.length).toEqual(2);
  expect(currentRow.childNodes[0].textContent).toEqual("hkn-JAiCz2A");
});

