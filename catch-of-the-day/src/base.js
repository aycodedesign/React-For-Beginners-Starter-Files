import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

  apiKey: "AIzaSyBcD2O0yShU-RsCcNxCmk6962Ms4_Yo-lc",

  authDomain: "catch-of-the-day-aycodedesign.firebaseapp.com",

  databaseURL: "https://catch-of-the-day-aycodedesign-default-rtdb.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

// 2 things created here: 1. firebase app, and 2. rebase binding

// this is a named export
export { firebaseApp };

// this is a default export
export default base;