import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { timePassedInSeconds } from "../../util/index";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
// import classes from "./Timer.module.css";

const Timer = (props) => {
  const currentQuestion = useSelector((state) => state.ui.currentQuestion);
  const [progress, setProgress] = useState(0);
  // const [startTime, setStartTime] = useState(Date.now());

  let startTime = Date.now();
  useEffect(() => {
    setProgress(0);
    // let timePassed = () => Date.now() - startTime;
    // const timePassedInSeconds = () => timePassed() / 1000;
    const MAX_TIME = 15;
    const timeInPercentage = () =>
      (timePassedInSeconds(startTime) / MAX_TIME) * 100;
    const progressBar = () =>
      timeInPercentage() > 100 ? 100 : timeInPercentage();

    const progressBarInterval = setInterval(() => {
      setProgress(progressBar());
    }, 100);

    return () => {
      clearInterval(progressBarInterval);
    };

    // eslint-disable-next-line
  }, [currentQuestion]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Box>
  );
};

export default Timer;
