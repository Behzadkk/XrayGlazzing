import React from "react";
import "./App.css";
import LandingPage from "./pages/landing";
import MainNavigation from "./components/Navigation/MainNav";
import navbarData from "./components/Navigation/navbarData";

function App() {
  return (
    <div className="App">
      <MainNavigation navbarData={navbarData} />
      <LandingPage />
    </div>
  );
}

export default App;
