import React from "react";
import "./App.css";

import MainNavigation from "./components/Navigation/MainNav";
import navbarData from "./components/Navigation/navbarData";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <MainNavigation navbarData={navbarData} />
      <LandingPage />
    </div>
  );
}

export default App;
