import {firebase} from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAhQiEuCA8SMOeJzJWS_T05UqBbn3mIzqc",
  authDomain: "richpanel-fb.firebaseapp.com",
  databaseURL: "https://richpanel-fb-default-rtdb.firebaseio.com",
  projectId: "richpanel-fb",
  storageBucket: "richpanel-fb.appspot.com",
  messagingSenderId: "946133449102",
  appId: "1:946133449102:web:42073e58c0ac4e07d08cdf"
};
	
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;