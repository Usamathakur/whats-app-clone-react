import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCYFfjrnKv4dSHQq6DI9FzfJ-F8zPCwUTw",
    authDomain: "whatsapp-clone-1d175.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-1d175.firebaseio.com",
    projectId: "whatsapp-clone-1d175",
    storageBucket: "whatsapp-clone-1d175.appspot.com",
    messagingSenderId: "207518283673",
    appId: "1:207518283673:web:ee454ffab3ef502ad68508",
    measurementId: "G-WH0WXQPR8C"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider };
export default db;