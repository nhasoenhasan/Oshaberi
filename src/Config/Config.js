import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCpkbAkUFHbNvwm-Qb1mGAUMVNm0_DKnTw",
    authDomain: "oshaberi-90914.firebaseapp.com",
    databaseURL: "https://oshaberi-90914.firebaseio.com",
    projectId: "oshaberi-90914",
    storageBucket: "oshaberi-90914.appspot.com",
    messagingSenderId: "184308163527",
    appId: "1:184308163527:web:2c55ba9e9d97dba48dafe2",
    measurementId: "G-RQYRHNB1FW"
};

// Initialize Firebase
let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export const Db = app.database();
export const Auth = app.auth();
export const Fbs = firebase;