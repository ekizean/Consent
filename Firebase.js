import * as firebase from "firebase";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyB1XsUuOIHqHTIp1LP13OccsxB5d0CcT2g",
  authDomain: "consent-agreement.firebaseapp.com",
  databaseURL: "https://consent-agreement.firebaseio.com",
  projectId: "consent-agreement",
  storageBucket: "consent-agreement.appspot.com",
  messagingSenderId: "693002474031"
};
firebase.initializeApp(config);

const database = firebase.database();

var firebaseRoot = "https://consent-agreement.firebaseio.com";

database.ref().set({ namn: "hej Gustav" });

export default database;
