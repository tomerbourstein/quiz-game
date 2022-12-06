import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <Box className={classes.circularProgressBox}>
      <CircularProgress thickness={10}  color="inherit"/>
    </Box>
  );
};
export default Loading;
