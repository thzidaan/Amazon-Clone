// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD6-P_GJxpGO9DkCWdJvv5cq3kmL0S00cA",
    authDomain: "challenge-fe8f5.firebaseapp.com",
    projectId: "challenge-fe8f5",
    storageBucket: "challenge-fe8f5.appspot.com",
    messagingSenderId: "1052104980186",
    appId: "1:1052104980186:web:d78b5f3557fd02d74a97e3",
    measurementId: "G-KETD5EDF25"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export {db, auth};