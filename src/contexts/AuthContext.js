import React, { useContext, useState, useEffect, useReducer } from "react";
import firebase, { db } from "../firebase-init";
import { useHistory, useLocation } from "react-router-dom";

export const ApplyJobContext = React.createContext();

// useContext を import する必要がなくなる。
// そのまま 格納できる。
export function useApplyJobContext() {
  return useContext(ApplyJobContext);
}

const usersRef = firebase.firestore().collection("users");

const initialState = {
  loading: true,
  // users: [],
  // user: {},
  current_user_documentID: "",
  // userDetail: {},
  success: false,
  error: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    case "APPLY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };
    case "APPLY_SUCCESS_RESET":
      return {
        ...state,
        loading: false,
        success: false,
      };
    case "ADD_DOCUMENT_USER_ID":
      return {
        ...state,
        loading: false,
        current_user_documentID: action.payload,
      };
    case "ADD_CUREENT_USER_DETAIL":
      return {
        ...state,
        loading: false,
        userDetail: action.payload,
      };
    case "UPDATE_LOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

// Provider:: 挟んで使うのみ。
// 一番下で、value を 渡している。
const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState();
  const [usersState, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const location = useLocation();

  function signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return firebase.auth().signOut();
  }
  // ユーザー登録(応募)
  async function apply(applicantInfo) {
    const docId = usersRef.doc().id;
    return await usersRef.doc(docId).set(
      Object.assign(applicantInfo, {
        id: docId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  }
  // 一覧
  function getUsers() {
    return usersRef.get();
  }
  // 更新
  function updateUser(documentId, updateObj) {
    db.doc(`users/${documentId}`)
      .update(updateObj)
      .then(() => {
        history.push("/dashboard");
      });
  }

  // 削除
  function deleteUser(documentId) {
    db.doc(`users/${documentId}`)
      .delete()
      .then(() => {
        history.push("/dashboard");
      });
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      console.log("[CurrentUser]AuthState Changed on Firebase:", user);
      setAdminUser(user);
      // setLoading(false);
      dispatch({ type: "UPDATE_LOADING" });
      console.log("before history pushed!!in Context.");
      console.log("location", location.pathname);
      if (location.pathname === "/login") {
        history.push("/dashboard");
      }
    });
    return unsubscribe;
  }, [adminUser]);

  const value = {
    apply,
    adminUser,
    login,
    logout,
    signup,
    getUsers,
    updateUser,
    deleteUser,
    usersState,
    current_user_documentID: usersState.current_user_documentID,
    dispatch,
  };
  return (
    <ApplyJobContext.Provider value={value}>
      {!usersState.loading && children}
    </ApplyJobContext.Provider>
  );
};

export default AuthProvider;
