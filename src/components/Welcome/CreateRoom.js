import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { databaseActions } from "../../store/database-slice";
import { uiActions } from "../../store/ui-slice";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { createRoomAndPlayers } from "../../util/Firebase";
import { randomNumber } from "../../util/index";
import Superheroes from "superheroes";
// import classes from "./Homepage.module.css";

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
    dispatch(uiActions.openQuizComponent());
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
