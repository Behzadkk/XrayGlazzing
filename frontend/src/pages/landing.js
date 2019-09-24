import React, { Component } from "react";
import Carousel from "../components/Carousel/Carousel";
import Hero from "../components/Hero/Hero";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Carousel />
        <Hero />
        <h1>Landing Page</h1>
      </div>
    );
  }
}

export default LandingPage;
