import { Fragment } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// import classes from "./Homepage.module.css";
const Welcome = () => {
  return (
    <Fragment>
      <CardContent>
        <Typography color="text.secondary">
          Hey There! Welcome to Quizy
        </Typography>
        <Typography variant="body2"> Select one of the following</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Create a Quizy Room</Button>
        <Button size="small">Join Game Quiz</Button>
      </CardActions>
    </Fragment>
  );
};

export default Welcome;
