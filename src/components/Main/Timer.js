import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// import classes from "./Timer.module.css";
const Timer = (props) => {
  const currentQuestion = useSelector((state) => state.ui.currentQuestion);
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(15);

  useEffect(() => {
    setProgress(0);
    setCounter(15);

    const timer = setInterval(() => {
      setCounter((oldCounter) => {
        if (oldCounter === 0) {
          return 0;
        }
        return oldCounter - 1;
      });
    }, 1000);

    const progressBar = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          return 100;
        }
        return oldProgress + 0.63;
      });
    }, 100);

    return () => {
      clearInterval(progressBar);
      clearInterval(timer);
    };
  }, [currentQuestion]);

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
