import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, getByTestId, queryByTestId } from '@testing-library/react';
import Player from '../components/player';
import { songsList } from './songs';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

test('renders empty', () => {
  store = mockStore({
    songs: [],
    currentIndex: 0
  });

  const { container } = render(<Provider store={store}><Player /></Provider>);
  expect(queryByTestId(container, 'react-player')).toBeNull();
});

test('renders player with current url', () => {
  store = mockStore({
    songs: songsList,
    currentIndex: 1
  });

  const { container } = render(<Provider store={store}><Player /></Provider>);
  expect(queryByTestId(container, 'react-player')).toBeTruthy();

  const videoPlayer = getByTestId(container, 'react-player');
  expect(videoPlayer.childNodes.length).toEqual(1);

  const videoElement = videoPlayer.childNodes[0];
  expect(videoElement.src).toMatch(new RegExp(/hkn-JAiCz2A/));
});

