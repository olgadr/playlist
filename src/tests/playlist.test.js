import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, getByTestId, fireEvent } from '@testing-library/react';
import Playlist from '../components/playlist';
import * as firebaseService from '../services/firebase';
import { songsList } from './songs';

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

test('renders list with 3 songs and current song index equals 1', () => {
  store = mockStore({
    songs: songsList,
    currentIndex: 1
  });

  const { container } = render(<Provider store={store}><Playlist /></Provider>);
  const playListWrapper = getByTestId(container, 'playlist-wrapper');
  expect(playListWrapper.childNodes.length).toEqual(3);

  const currentRow = getByTestId(container, 'current-row');
  expect(currentRow.childNodes.length).toEqual(2);
  expect(currentRow.childNodes[0].textContent).toEqual("http://y2u.be/hkn-JAiCz2A");
});

test('should call handleRemoveSong action when user clicks on remove button', () => {
  store = mockStore({
    songs: songsList,
    currentIndex: 0
  });

  const { container } = render(<Provider store={store}><Playlist /></Provider>);
  const handleRemoveSong = jest.spyOn(firebaseService, 'handleRemoveSong');

  const btnRemove = getByTestId(container, 'btn-remove-1');
  fireEvent(
    btnRemove,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );
  
  expect(handleRemoveSong).toHaveBeenCalled();
  expect(handleRemoveSong).toHaveBeenCalledWith( songsList[1].id );
});

