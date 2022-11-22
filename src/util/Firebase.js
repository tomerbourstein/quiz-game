import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  get,
  onDisconnect,
  child,
  update,
} from "firebase/database";

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


// If user is recognized as Admin, post quiz question on firebase.
const changeQuizQuestion = (question, roomKey) => {
  const quizRef = ref(db, "rooms/" + roomKey + "/quiz");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;

      // Get isAdmin data for user.
      const dbRef = ref(db);
      get(child(dbRef, `rooms/${roomKey}/players/${uid}/isAdmin`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const checkIsAdmin = snapshot.val();
            console.log("Am I the Admin? " + checkIsAdmin);

            // Only admin post quiz questions to Firebase.
            if (checkIsAdmin) {
              writeQuizData(question, quizRef);
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // User is signed out
    }
  });
};

// Create room in Realtime Database when creating a room joining room, deleting from database onDisconnet.
const createRoomAndPlayers = (
  nickname,
  roomKey,
  isAdmin,
  generatedNickname
) => {
  let data;
  if (nickname === "" || nickname === null) {
    data = { roomKey, isAdmin, nickname: generatedNickname };
  } else {
    data = { roomKey, isAdmin, nickname };
  }
  console.log(data);

  const signInAnonymouslyFirebase = () => {
    signInAnonymously(auth)
      .then(() => {
        console.log("Im Signed In");
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;

      writeUserData(uid, data.nickname, data.isAdmin, data.roomKey);
    } else {
      // User is signed out
    }
  });

  signInAnonymouslyFirebase();
};

const writeUserData = (userId, nickname, isAdmin, roomKey) => {
  const presenceRef = ref(db, "rooms/" + roomKey + "/players/" + userId);
  set(presenceRef, {
    id: userId,
    nickname,
    score: 0,
    isAdmin,
  });

  onDisconnect(presenceRef)
    .remove()
    .catch((err) => {
      if (err) {
        console.error("could not establish onDisconnect event", err);
      }
    });
};

const writeQuizData = (question, quizRef) => {
  set(quizRef, {
    question,
  });
};

const writeStartQuizData = (roomKey, isStart) => {
  const quizRef = ref(db, "rooms/" + roomKey + "/start");
  update(quizRef, { start: isStart });
};

export { createRoomAndPlayers, changeQuizQuestion, writeStartQuizData };
