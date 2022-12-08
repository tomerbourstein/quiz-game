import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { databaseActions } from "../../store/database-slice";
import { uiActions } from "../../store/ui-slice";
import { createRoomAndPlayers } from "../../util/Firebase";
import useInput from "../../hooks/use-input";

import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import Superheroes from "superheroes";
import Hero from "../../images/hero-icon-50px.png";
import Numbers from "../../images/numbers.png";
import classes from "./Homepage.module.css";

const EnterRoom = () => {
  const [generatedNickname, setGeneratedNickname] = useState("");
  const [nickname, setNickname] = useState(null);
  const dispatch = useDispatch();

  const {
    value: enteredRoomKey,
    isValid: roomKeyIsValid,
    hasError: roomKeyHasError,
    valueChangeHandler: roomKeyChangeHandler,
    valueBlurHandler: roomKeyBlurHandler,
    // reset: roomKeyResetHandler,
  } = useInput((value) => /^[0-9\b]+$/.test(value) && value.trim() !== "");

  useEffect(() => {
    const generateNickname = Superheroes.random();
    setGeneratedNickname(generateNickname);
  }, []);

  const nicknameChangeHandler = (event) => {
    setNickname(event.target.value);
  };

  const enterRoomSubmitHandler = (event) => {
    event.preventDefault();

    createRoomAndPlayers(nickname, enteredRoomKey, false, generatedNickname);
    dispatch(databaseActions.saveRoomKey(enteredRoomKey));
    dispatch(uiActions.playAnimation());

    setTimeout(() => {
      dispatch(uiActions.isLoading(true));
    }, 500);

    setTimeout(() => {
      dispatch(uiActions.openQuizComponent());
    }, 1500);
  };

  return (
    <Fragment>
      <div className={classes.actionButtons}>
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
        <CardActions className={classes.nonTextField}>
          Enter Room Key{" "}
        </CardActions>
        <CardActions>
          <TextField
            fullWidth
            id="outlined-name"
            label={roomKeyHasError ? "Invalid" : "Enter Key"}
            onChange={roomKeyChangeHandler}
            onBlur={roomKeyBlurHandler}
            value={enteredRoomKey}
            error={roomKeyHasError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className={classes.adornment}>
                  <img
                    src={Numbers}
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
        <Button onClick={enterRoomSubmitHandler} disabled={!roomKeyIsValid}>
          {" "}
          Enter Room{" "}
        </Button>
      </CardActions>
    </Fragment>
  );
};

export default EnterRoom;
