import "./App.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy4dTQPEuxVpNvJDyE_WQ7OV4e9zQvisY",
  authDomain: "quiz-game-6e76d.firebaseapp.com",
  projectId: "quiz-game-6e76d",
  storageBucket: "quiz-game-6e76d.appspot.com",
  messagingSenderId: "658511477887",
  appId: "1:658511477887:web:18b7b8c42c9df60c7f134a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getDatabase();

function App() {
  useEffect(() => {
    const signInAnonymouslyFirebase = () => {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          writeUserData(uid, "nickname");
        } else {
          // User is signed out
          // ...
        }
      });

      signInAnonymously(auth)
        .then(() => {
          // Signed in..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
          console.log(errorCode, errorMessage);
        });
    };

    const writeUserData = (userId, nickname) => {
      set(ref(db, "players/" + userId), {
        id: userId,
        nickname,
      });
    };

    signInAnonymouslyFirebase();
  }, []);

  return <div className="App"></div>;
}

export default App;
