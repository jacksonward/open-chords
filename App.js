import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from './Home.js'
import Song from './Song.js'

import firebase from "firebase"
import "firebase/firestore"

// Disable annoying yellow pop-up that tells me my code is bad
console.disableYellowBox = true;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDmGYveVkpM1xaRMnYn2pEZwm406Oes2x8",
  authDomain: "chordapp-1905d.firebaseapp.com",
  databaseURL: "https://chordapp-1905d.firebaseio.com",
  projectId: "chordapp-1905d",
  storageBucket: "chordapp-1905d.appspot.com",
  messagingSenderId: "397248021107"
};
firebase.initializeApp(config);

// Expose database object globally for all screens
db = firebase.firestore()

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Song: {
    screen: Song
  }
});

export default createAppContainer(AppNavigator); 