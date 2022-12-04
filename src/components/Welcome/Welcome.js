import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
        <Typography>Hey There! Welcome to Quizi</Typography>
        <Typography variant="body2"> Select one of the following</Typography>
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
