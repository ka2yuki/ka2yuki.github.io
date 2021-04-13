import firebase from '../firebase-init'

function signInWithEmailPassword() {
  var email = "test@example.com";
  var password = "hunter2";
  // [START auth_signin_password]
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_signin_password]
}

export const signUpWithEmailPassword = (email: string, password: string) => {

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("test", userCredential);
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.log("test-error", error);
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_signup_password]
}

export function sendPasswordReset() {
  const email = "sam@example.com";
  // [START auth_send_password_reset]
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_send_password_reset]
}


