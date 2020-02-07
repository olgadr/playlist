import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, getByTestId, queryByTestId, fireEvent } from '@testing-library/react';
import AddSong from '../components/add-song';
import * as actions from "../actions";

const songsList = [
  {
    "id": "1",
    "url": "http://y2u.be/alHX1fJ9I-w"
  },
  {
    "id": "2",
    "url": "http://y2u.be/hkn-JAiCz2A"
  },
  {
    "id": "3",
    "url": "http://y2u.be/8aGhZQkoFbQ"
  }
];

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

test('when user clicks on the button, addSong action is called with the input value', () => {
  store = mockStore({
    songs: songsList,
    currentIndex: 1
  });

  const addSong = jest.spyOn(actions, 'addSong');
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

  expect(addSong).toHaveBeenCalled();
  expect(addSong).toHaveBeenCalledWith({ url: songUrl, id: songIndex });
});

