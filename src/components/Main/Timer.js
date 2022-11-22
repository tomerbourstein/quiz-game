import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// import classes from "./Timer.module.css";
const Timer = (props) => {
  const currentQuestion = useSelector((state) => state.ui.currentQuestion);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [counter, setCounter] = useState(15);

  useEffect(() => {
    setProgress(0);
    setStartTime(Date.now());
    setCounter(15);

    const timer = setInterval(() => {
      setCounter((oldCounter) => {
        if (oldCounter === 0) {
          return 0;
        }
        return oldCounter - 1;
      });
    }, 1000);

    const timePassed = () => Date.now() - startTime;
    const timePassedInSeconds = () => timePassed() / 1000;
    const MAX_TIME = 15;
    const timeInPercentage = () => (timePassedInSeconds() / MAX_TIME) * 100;
    const progressBar = () =>
      timeInPercentage() > 100 ? 100 : timeInPercentage();

    const progressBarInterval = setInterval(() => {
      console.log(timeInPercentage());
      setProgress(progressBar());
    }, 100);
    // const progressBar = setInterval(() => {

    //   setProgress((oldProgress) => {
    //     if (oldProgress >= 100) {
    //       return 100;
    //     }
    //     return oldProgress + 0.63;
    //   });
    // }, 100);

    return () => {
      clearInterval(progressBarInterval);
      clearInterval(timer);
    };
  }, [currentQuestion, startTime]);

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
