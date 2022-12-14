import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { databaseActions } from "../../store/database-slice";
import { uiActions } from "../../store/ui-slice";
import { createRoomAndPlayers } from "../../util/Firebase";
import { randomNumber } from "../../util/index";

import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import Superheroes from "superheroes";
import Hero from "../../images/hero-icon-50px.png";
import classes from "./Homepage.module.css";

const CreateRoom = () => {
  const [roomKey, setRoomKey] = useState("");
  const [generatedNickname, setGeneratedNickname] = useState("");
  const [nickname, setNickname] = useState(null);
  const dispatch = useDispatch();

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
    createRoomAndPlayers(nickname, roomKey, true, generatedNickname);
    dispatch(databaseActions.saveRoomKey(roomKey));
    dispatch(databaseActions.setAdmin());
    dispatch(uiActions.playAnimation());

    setTimeout(() => {
      dispatch(uiActions.isLoading(true));
    }, 500);

    setTimeout(() => {
      dispatch(uiActions.openQuizComponent());
    }, 1500);
  };

  const copyToClipboardHandler = (roomKey) => {
    navigator.clipboard.writeText(roomKey);
    console.log(roomKey);
  };

  return (
    <div className={classes.createRoomButtons}>
      <div className={classes.actionButtons}>
        <CardActions>
          <TextField
            fullWidth
            className={classes.TextField}
            disabled
            id="outlined-name"
            label="Room Key"
            value={roomKey}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className={classes.adornment}>
                  <Button onClick={() => copyToClipboardHandler(roomKey)}>
                    Copy
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </CardActions>
        <CardActions className={classes.nonTextField}>
          {" "}
          Share With Friends!
        </CardActions>
        <CardActions>
          <TextField
            fullWidth
            id="outlined-name"
            label="Choose Nickname"
            value={!nickname && nickname !== "" ? generatedNickname : nickname}
            onChange={nicknameChangeHandler}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className={classes.adornment}>
                  <img
                    src={Hero}
                    alt="superhero avatar"
                    className={classes.heroAvatar}
                  />
                </InputAdornment>
              ),
            }}
          />
        </CardActions>
      </div>
      <CardActions className={classes.enterRoom}>
        <Button onClick={createRoomSubmitHandler}> Create Room </Button>
      </CardActions>
    </div>
  );
};

export default CreateRoom;
