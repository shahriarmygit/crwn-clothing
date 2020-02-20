import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const Config = {
  apiKey: "AIzaSyA-Mfdg7W6ONvwbSyld6kqwk-OiZIF8LKs",
  authDomain: "crwn-clothing-6879b.firebaseapp.com",
  databaseURL: "https://crwn-clothing-6879b.firebaseio.com",
  projectId: "crwn-clothing-6879b",
  storageBucket: "crwn-clothing-6879b.appspot.com",
  messagingSenderId: "4210749588",
  appId: "1:4210749588:web:99fc99719ce3c0e7bb4481",
  measurementId: "G-47P40M92ZG"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch(error) { 
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(Config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;