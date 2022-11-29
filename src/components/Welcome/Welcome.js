import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// import classes from "./Homepage.module.css";
const Welcome = () => {
  const dispatch = useDispatch();

const createRoomButtonHandler = () => {
  dispatch(uiActions.createRoom());
}

const enterRoomButtonHandler = () => {
  dispatch(uiActions.enterRoom());
}

  return (
    <Fragment>
      <CardContent>
        <Typography color="text.secondary">
          Hey There! Welcome to Quizy
        </Typography>
        <Typography variant="body2"> Select one of the following</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={createRoomButtonHandler} size="small">Create a Quizy Room</Button>
        <Button onClick={enterRoomButtonHandler} size="small">Join Game Quiz</Button>
      </CardActions>
    </Fragment>
  );
};

export default Welcome;
