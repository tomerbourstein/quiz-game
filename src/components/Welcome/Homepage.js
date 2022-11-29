import { useSelector } from "react-redux";
import Welcome from "./Welcome";
import CreateRoom from "./CreateRoom";
import EnterRoom from "./EnterRoom";

import Card from "@mui/material/Card";
import classes from "./Homepage.module.css";

const Homepage = () => {
  const createRoomDialogShow = useSelector((state) => state.ui.createRoomDialogShow);
  const enterRoomDialogShow = useSelector((state) => state.ui.enterRoomDialogShow);
  return (
    <Card className={classes.card}>
      <Welcome />
      {createRoomDialogShow && <CreateRoom />}
      {enterRoomDialogShow && <EnterRoom />}
    </Card>
  );
};
export default Homepage;
