import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import classes from "./Welcome.module.css";
const Welcome = () => {
  return (
    <Card className={classes.card} sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
        Hey There! Welcome to Quizy
        </Typography>

        <Typography variant="body2"> Select one of the following</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Create a Quizy Room</Button>
        <Button size="small">Join Game Quiz</Button>
      </CardActions>
    </Card>
  );
};

export default Welcome;
