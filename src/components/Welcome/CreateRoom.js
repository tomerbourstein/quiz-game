import { Fragment, useEffect, useState } from "react";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { randomNumber } from "../../util/index";
import Superheroes from "superheroes";
// import classes from "./Homepage.module.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
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

const CreateRoom = () => {
  const [roomKey, setRoomKey] = useState("");
  const [generatedNickname, setGeneratedNickname] = useState("");
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    const generateRoomKey = randomNumber(1000, 9999);
    const generateNickname = Superheroes.random();
    setRoomKey(generateRoomKey);
    setGeneratedNickname(generateNickname);
  }, []);

  const nicknameChangeHandler = (event) => {
    setNickname(event.target.value);
  };

  const createRoomSubmitHandler = (event) => {
    event.preventDefault();

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
    };

    signInAnonymouslyFirebase();
  };

  return (
    <Fragment>
      <CardContent>
        <Typography color="text.secondary">
          Share Room Key With Your Friends!
        </Typography>
      </CardContent>
      <CardActions>
        <TextField
          disabled
          id="outlined-name"
          label="Room Key"
          value={roomKey}
        />
        <Button> Copy </Button>
      </CardActions>
      <CardActions>
        <TextField
          id="outlined-name"
          label="Choose Nickname"
          value={!nickname && nickname !== "" ? generatedNickname : nickname}
          onChange={nicknameChangeHandler}
        />
        <Button onClick={createRoomSubmitHandler}> Enter Room </Button>
      </CardActions>
    </Fragment>
  );
};

export default CreateRoom;
