// import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Welcome/Homepage";
import Main from "./components/Main/Main";
import "./App.css";

function App() {
  const homepageShow = useSelector((state) => state.ui.homepageShow);
  const mainShow = useSelector((state) => state.ui.mainShow);
  // useEffect(() => {

  // }, []);

  return (
    <div className="App">
      <Header />
      {homepageShow && <Homepage />}
      {mainShow && <Main />}
      <Footer />
    </div>
  );
}

export default App;
