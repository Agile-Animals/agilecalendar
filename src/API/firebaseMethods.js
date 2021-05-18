import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(
  email,
  password,
  lastName,
  firstName,
  pushToken,
  isPersonnel = false
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
      isPersonnel: isPersonnel,
    });
  } catch (err) {
    Alert.alert(
      "Fel e-post eller så finns inte denna användare ännu.",
      err.message
    );
  }
}

export async function signIn(email, password, pushToken) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).update({
      pushToken: pushToken,
    });
  } catch (err) {
    Alert.alert("Fel lösenord eller e-postadress.", err.message);
    return -1;
  }
  return 0;
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("Något gick fel.", err.message);
    return -1;
  }
  return 0;
}
