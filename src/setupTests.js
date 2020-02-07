// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
const mockdatabase = new firebasemock.MockFirebase();
const mocksdk = firebasemock.MockFirebaseSdk(function (path) {
    return path ? mockdatabase.child(path) : mockdatabase;
}, function () {
    return mockauth;
});
mocksdk.initializeApp();

