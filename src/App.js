import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Welcome/Homepage";
import Main from "./components/Main/Main";
import Loading from "./components/UI/Loading";

import "./App.css";

// Bugs to fix:
// 1. firebase - delete room when admin leaves, delete player when not admin.
// 3. 2X bonus doesnt display proper number.
// 6. podium pops not only when quiz finishes.
// 7. restarting quiz doesn't fetch different questions.

function getWindowSize() {
  const { innerWidth } = window;
  return innerWidth;
}

function App() {
  const homepageShow = useSelector((state) => state.ui.homepageShow);
  const mainShow = useSelector((state) => state.ui.mainShow);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(uiActions.setScreenWidth(getWindowSize()));
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      <div className="wrapper">
        {homepageShow && <Homepage />}

        {isLoading && <Loading />}

        {mainShow && <Main />}
      </div>

      <Footer />
    </div>
  );
}

export default App;
