import { Fragment, useState } from "react";
import Players from "./Players";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import classes from "./Players.module.css";

const DrawerLeft = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  return (
    <Fragment>
      <Button onClick={toggleDrawer(true)} className={classes.toggleDrawerButton}>Scoreboard</Button>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Players
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        />
      </Drawer>
    </Fragment>
  );
};

export default DrawerLeft;
