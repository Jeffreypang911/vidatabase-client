import React from "react";
import ReactDOM from "react-dom";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";
import "react-day-picker/lib/style.css";
import SubmissionForum from "./SubmissionForum";
import HomePage from "./HomePage";
import firebase from "firebase";

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

const rootElement = document.getElementById("root");
ReactDOM.render(<HomePage />, rootElement);

// const rootElement = document.getElementById("root");
// ReactDOM.render(<SubmissionForum />, rootElement);
