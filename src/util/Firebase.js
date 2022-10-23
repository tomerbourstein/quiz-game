import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onDisconnect } from "firebase/database";

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



const createRoomAndPlayers = (nickname, roomKey, generatedNickname) => {
  let data;
  if (nickname === "" || nickname === null) {
    data = { roomKey, nickname: generatedNickname };
  } else {
    data = { roomKey, nickname };
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
    console.log(user);
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      writeUserData(uid, data.nickname, data.roomKey);
    } else {
      // User is signed out
      // ...
    }
  });

  const writeUserData = (userId, nickname, roomKey) => {
    set(ref(db, "rooms/" + roomKey + "/players/" + userId), {
      id: userId,
      nickname,
    });

    const presenceRef = ref(db, "rooms/" + roomKey + "/players/" + userId);
    onDisconnect(presenceRef)
      .remove()
      .catch((err) => {
        if (err) {
          console.error("could not establish onDisconnect event", err);
        }
      });
  };

  signInAnonymouslyFirebase();
};

export { createRoomAndPlayers };
