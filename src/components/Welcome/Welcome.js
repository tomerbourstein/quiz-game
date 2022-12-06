import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import classes from "./Homepage.module.css";

const Welcome = () => {
  const dispatch = useDispatch();

  const createRoomButtonHandler = () => {
    dispatch(uiActions.createRoom());
  };

  const enterRoomButtonHandler = () => {
    dispatch(uiActions.enterRoom());
  };

  return (
    <Fragment>
      <CardContent>
        <h1 className={classes.headingDesktop}>Hey There! Welcome to Quizi</h1>
        <h1 className={classes.headingMobile}>Hey There!</h1>
        <h1 className={classes.headingMobile}>Welcome to Quizi</h1>
        <h2> Select one of the following</h2>
      </CardContent>
      <CardActions className={classes.createOrJoin}>
        <Button onClick={createRoomButtonHandler} size="small">
          Create
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button onClick={enterRoomButtonHandler} size="small">
          Join
        </Button>
      </CardActions>
    </Fragment>
  );
};

export default Welcome;
