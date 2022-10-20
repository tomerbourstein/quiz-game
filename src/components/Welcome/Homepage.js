import Welcome from "./Welcome";
import CreateRoom from "./CreateRoom";
import EnterRoom from "./EnterRoom";

import Card from "@mui/material/Card";
import classes from "./Homepage.module.css";

const Homepage = () => {
  return (
    <Card className={classes.card}>
      <Welcome />
      <CreateRoom />
      <EnterRoom />
    </Card>
  );
};
export default Homepage;
