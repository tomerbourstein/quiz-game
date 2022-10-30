// import { useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Welcome/Homepage";
import Main from "./components/Main/Main";
import "./App.css";



function App() {
  // useEffect(() => {
    
  // }, []);

  return (
    <div className="App">
      <Header />
      <Homepage />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
