import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAbAASayEdJK5fb2DcG_VyGtmDLf36zj-M",
    authDomain: "agilecalendar-86be5.firebaseapp.com",
    databaseURL: "https://agilecalendar-86be5.firebaseio.com",
    projectId: "agilecalendar-86be5",
    storageBucket: "agilecalendar-86be5.appspot.com",
    messagingSenderId: "685831181387",
    appId: "1:685831181387:android:cf6438b804b16217a029ce"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;