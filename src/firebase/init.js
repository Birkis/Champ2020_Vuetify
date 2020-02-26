import firebase from 'firebase'
//import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDCpRXe7q7yBbMmaV6u183y01LhpBjdCYo",
    authDomain: "champ2020-vuetify.firebaseapp.com",
    databaseURL: "https://champ2020-vuetify.firebaseio.com",
    projectId: "champ2020-vuetify",
    storageBucket: "champ2020-vuetify.appspot.com",
    messagingSenderId: "456248055232",
    appId: "1:456248055232:web:4e42bfcb3bc946f52a2425",
    measurementId: "G-7EL1DLNF0T"
  };
  // Initialize Firebase


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebaseApp.firestore()


