// import { databaseActions } from "../store/database-slice";
// import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  ref,
  get,
  child,
  set,
  onDisconnect,
  // onValue,
} from "firebase/database";

// const api = axios.create({
//   baseURL: "https://quiz-game-6e76d-default-rtdb.firebaseio.com/",
// });
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
    console.log(user);
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;

      // ...
      writeUserData(uid, data.nickname, data.isAdmin, data.roomKey);
    } else {
      // User is signed out
      // ...
    }
  });

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

  signInAnonymouslyFirebase();
};

// const getPlayers = (roomKey) => {
// const nicknamesRef = ref(db, "rooms/" + roomKey + "/players");
// let data;
// onValue(nicknamesRef, (snapshot) => {
//   data = snapshot.val();
// });
// console.log(data);
// return data;
// };

const getPlayers = (roomKey) => {
  return (dispatch) => {
    // api.get( `/rooms/${roomKey}/players`).then(res => {
    //   console.log(res.data);
    // })

    //   api.get(`/rooms/${roomKey}/players`)
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
    // }
    const fetchData = () => {
      const dbRef = ref(db);
      get(child(dbRef, `rooms/${roomKey}/players`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          return snapshot.val();
        } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      };
      fetchData();
  };
};
// const getPlayersThunk = (roomKey) => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const nicknamesRef = ref(db, "rooms/" + roomKey + "/players");
//       return onValue(
//         nicknamesRef,
//         (snapshot) => {
//            snapshot.val();
//         },
//         {
//           onlyOnce: true,
//         }
//       );
//     };
//     try {
//       const playersData = await fetchData();
//       console.log(playersData);
//       dispatch(databaseActions.savePlayers(playersData));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };

export { createRoomAndPlayers, getPlayers };
