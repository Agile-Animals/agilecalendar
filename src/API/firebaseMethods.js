import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(
  email,
  password,
  lastName,
  firstName,
  pushToken
) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      lastName: lastName,
      firstName: firstName,
      pushToken: pushToken,
    });
  } catch (err) {
    Alert.alert(
      "Fel e-post eller så finns inte denna användare ännu.",
      err.message
    );
  }
}

export async function signIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("Fel lösenord eller e-postadress.", err.message);
  }
  return 1;
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
