import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAUkJdw5K-glp5qJNdU8AqvenvahQB-fEQ",
	authDomain: "instagram-clone-react-af7ac.firebaseapp.com",
	projectId: "instagram-clone-react-af7ac",
	storageBucket: "instagram-clone-react-af7ac.appspot.com",
	messagingSenderId: "427375423260",
	appId: "1:427375423260:web:8784a13c5822ae1dcf54d9",
	measurementId: "G-MXZ0WSGJ9F"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };