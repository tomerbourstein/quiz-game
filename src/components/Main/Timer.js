import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { timePassedInSeconds } from "../../util/index";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import classes from "./Timer.module.css";

const Timer = (props) => {
  const currentQuestion = useSelector((state) => state.ui.currentQuestion);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  let startTime = Date.now();
  useEffect(() => {
    setProgress(0);

    const MAX_TIME = 15;
    const timeInPercentage = () =>
      (timePassedInSeconds(startTime) / MAX_TIME) * 100;
    const progressBar = () => {
      if (timeInPercentage() > 100) {
        dispatch(uiActions.isShowAnswer(true));
        dispatch(uiActions.showAllAnswers(false));
        setTimeout(() => {
          dispatch(uiActions.isShowAnswer(false));
        }, 2000);
        return 100;
      } else {
        return timeInPercentage();
      }
    };

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
        <LinearProgress
          className={classes.timer}
          variant="determinate"
          color="inherit"
          value={progress}
        />
      </Box>
    </Box>
  );
};

export default Timer;
