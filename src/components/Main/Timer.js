import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// import classes from "./Timer.module.css";
const Timer = (props) => {
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          return 0;
        }
        return oldProgress + 6.7;
      });

      setCounter((oldCounter) => {
        if (oldCounter === 0) {
          return 15;
        }
        return oldCounter - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {counter + "sec"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Timer;
