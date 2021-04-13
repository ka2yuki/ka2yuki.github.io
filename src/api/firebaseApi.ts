import firebase from "../firebase-init";

// references.
const firestore = firebase.firestore();
const usersRef = firestore.collection("users");

export const postUser = (applicantInfo: Object) => {
  usersRef
    .add(applicantInfo)
    .then((docRef) => {
      console.log("res id:", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};
