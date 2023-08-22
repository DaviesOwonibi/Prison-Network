/* 
This is the setup file for the firebase api usage, 
here you will find the authentication setup on lines 4 and 16
*/

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAs8IGOn6q9Cj5R6m3O1vY73KYHvF5z0Gs",
	authDomain: "chatapp-edc52.firebaseapp.com",
	projectId: "chatapp-edc52",
	storageBucket: "chatapp-edc52.appspot.com",
	messagingSenderId: "150754611447",
	appId: "1:150754611447:web:a0790817f4bcb7b17283f2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
