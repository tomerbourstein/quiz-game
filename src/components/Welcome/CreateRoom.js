import { Fragment } from "react";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// import classes from "./Homepage.module.css";

const CreateRoom = () => {
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
          defaultValue="4Z5FF"
        />
        <Button> Copy </Button>
      </CardActions>
      <CardActions>
        <TextField
          id="outlined-name"
          label="Choose Nickname"
          defaultValue="Random Nickname"
        />
        <Button> Enter Room </Button>
      </CardActions>
    </Fragment>
  );
};

export default CreateRoom;
