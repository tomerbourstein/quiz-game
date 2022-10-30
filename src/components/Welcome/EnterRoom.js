import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { databaseActions } from "../../store/database-slice";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { createRoomAndPlayers } from "../../util/Firebase";
import { randomNumber } from "../../util/index";
import Superheroes from "superheroes";
// import classes from "./Homepage.module.css";

const EnterRoom = () => {
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

  const roomKeyChangeHandler = (event) => {
    setRoomKey(event.target.value);
  };

  const enterRoomSubmitHandler = (event) => {
    event.preventDefault();
    createRoomAndPlayers(nickname, roomKey, false, generatedNickname);
    dispatch(databaseActions.saveRoomKey(roomKey));
  };

  return (
    <Fragment>
      <CardContent>
        <Typography color="text.secondary">Enter Room Key</Typography>
      </CardContent>
      <CardActions>
        <TextField
          id="outlined-name"
          label="Choose Nickname"
          value={!nickname && nickname !== "" ? generatedNickname : nickname}
          onChange={nicknameChangeHandler}
        />
      </CardActions>
      <CardActions>
        <TextField
          id="outlined-name"
          label="Enter Key"
          onChange={roomKeyChangeHandler}
        />
      </CardActions>
      <CardActions>
        <Button onClick={enterRoomSubmitHandler}> Enter Room </Button>
      </CardActions>
    </Fragment>
  );
};

export default EnterRoom;
