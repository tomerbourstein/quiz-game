import { useSelector } from "react-redux";
import Welcome from "./Welcome";
import CreateRoom from "./CreateRoom";
import EnterRoom from "./EnterRoom";

import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import classes from "./Homepage.module.css";

const Homepage = () => {
  const createRoomDialogShow = useSelector(
    (state) => state.ui.createRoomDialogShow
  );
  const enterRoomDialogShow = useSelector(
    (state) => state.ui.enterRoomDialogShow
  );
  const startAnimation = useSelector((state) => state.ui.startAnimation);

  const animationClass = startAnimation && classes.rollout;
  return (
    <Card className={`${classes.card} ${animationClass}`}>
      <Welcome />
      {createRoomDialogShow && enterRoomDialogShow && (
        <Divider variant="middle" />
      )}

      <Collapse in={createRoomDialogShow} unmountOnExit>
        <Divider variant="middle" />
        <CreateRoom />
      </Collapse>

      <Collapse in={enterRoomDialogShow} unmountOnExit>
        <Divider variant="middle" />
        <EnterRoom />
      </Collapse>
    </Card>
  );
};
export default Homepage;
