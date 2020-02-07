import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCrUeKKbaQ2Wv8eoos1JG2DUNuzItUtC9w",
    authDomain: "olgadr-playlist.firebaseapp.com",
    databaseURL: "https://olgadr-playlist.firebaseio.com",
    projectId: "olgadr-playlist",
    storageBucket: "olgadr-playlist.appspot.com",
    messagingSenderId: "62653526516",
    appId: "1:62653526516:web:4fe4725887bf514c1309a1",
    measurementId: "G-7VSB0PQDB6"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = firebase.database();
export const songsRef = database.ref('/songs');