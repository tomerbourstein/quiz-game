import { Fragment } from "react";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// import classes from "./Homepage.module.css";

const EnterRoom = () => {
  return (
    <Fragment>
      <CardContent>
        <Typography color="text.secondary">Enter Room Key</Typography>
      </CardContent>
      <CardActions>
        <TextField
          id="outlined-name"
          label="Choose Nickname"
          defaultValue="Random Nickname"
        />
      </CardActions>
      <CardActions>
        <TextField id="outlined-name" label="Room Key" defaultValue="4Z5FF" />
      </CardActions>
      <CardActions>
        <Button> Enter Room </Button>
      </CardActions>
    </Fragment>
  );
};

export default EnterRoom;
