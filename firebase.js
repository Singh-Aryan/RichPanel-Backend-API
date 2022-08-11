import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAhQiEuCA8SMOeJzJWS_T05UqBbn3mIzqc",
    authDomain: "richpanel-fb.firebaseapp.com",
    projectId: "richpanel-fb",
    storageBucket: "richpanel-fb.appspot.com",
    messagingSenderId: "946133449102",
    appId: "1:946133449102:web:42073e58c0ac4e07d08cdf"
  };

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };