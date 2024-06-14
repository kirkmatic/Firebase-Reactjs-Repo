
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCdqykTuQXy-nKnNd0u_YND89Z8BUArogE",
  authDomain: "my-firebase-app-9b7bc.firebaseapp.com",
  projectId: "my-firebase-app-9b7bc",
  storageBucket: "my-firebase-app-9b7bc.appspot.com",
  messagingSenderId: "894447674368",
  appId: "1:894447674368:web:abc05ccdf63124393de4e5"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth()

export { db, auth };
