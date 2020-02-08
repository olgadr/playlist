import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, getByTestId, queryByTestId, fireEvent } from '@testing-library/react';
import AddSong from '../components/add-song';
import * as firebaseService from '../services/firebase';
import { songsList } from './songs';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

test('renders input and button elements', () => {
  store = mockStore({
    songs: [],
    currentIndex: 0
  });

  const { container } = render(<Provider store={store}><AddSong /></Provider>);
  expect(queryByTestId(container, 'text-input')).toBeTruthy();
  expect(queryByTestId(container, 'button-add')).toBeTruthy();
});

test('should call handleAddSong with the input value when user clicks on the button, ', () => {
  store = mockStore({
    songs: songsList,
    currentIndex: 1
  });

  const handleAddSong = jest.spyOn(firebaseService, 'handleAddSong');
  const songUrl = 'http://y2u.be/new';
  const songIndex = songsList ? songsList.length : 0;

  const { container } = render(<Provider store={store}><AddSong /></Provider>);
  const textInput = getByTestId(container, 'text-input');
  fireEvent.change(
    textInput,
    { target: { value: songUrl} }
  );

  const button = getByTestId(container, 'button-add');
  fireEvent(
    button,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  ); 

  expect(handleAddSong).toHaveBeenCalled();
  expect(handleAddSong).toHaveBeenCalledWith({ url: songUrl, id: songIndex });
});

