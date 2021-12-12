import firebase from 'firebase'

function initFirestore(){
  const firebaseConfig = {
    apiKey: "AIzaSyCF9kBGgGNGBNSOwxmHyr9Ehm2lvXwr6KU",
    authDomain: "expense-app-15f00.firebaseapp.com",
    projectId: "expense-app-15f00",
    storageBucket: "expense-app-15f00.appspot.com",
    messagingSenderId: "646688476165",
    appId: "1:646688476165:web:9d48e74c8a612829f8e06c"
  };

  const _firebase  = firebase.initializeApp(firebaseConfig)

  return _firebase.firestore()
}

export {
  initFirestore
}