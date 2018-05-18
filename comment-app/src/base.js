import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAgpWRCzLE1rgCudrxjTube5zq0I9g7RGw",
    authDomain: "reactjs-61f61.firebaseapp.com",
    databaseURL: "https://reactjs-61f61.firebaseio.com",
    projectId: "reactjs-61f61",
    storageBucket: "reactjs-61f61.appspot.com",
    messagingSenderId: "719092336372"
});

const db = firebase.database(firebaseApp);
const base = Rebase.createClass(db);

export const providers = {
    'facebook': new firebase.auth.FacebookAuthProvider()
}

export const auth = firebase.auth()
export default base