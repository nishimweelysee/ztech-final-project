// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT9h2kO3tkg4PV3TLD15-DV5N-cd_ZwlM",
  authDomain: "ztech-6760e.firebaseapp.com",
  projectId: "ztech-6760e",
  storageBucket: "ztech-6760e.appspot.com",
  messagingSenderId: "571487253296",
  appId: "1:571487253296:web:c7cd46c372fec553fccef5"
};

// Initialize Firebase 
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const database = firebase.database();
export const storage = firebase.storage();
export default firebase;