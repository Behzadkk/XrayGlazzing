import React, { Component } from "react";
import Carousel from "../components/Carousel/Carousel";
import Hero from "../components/Hero/Hero";
import Cards from "../components/Cards/Cards";
import Featurette from "../components/Featurette/Featurette";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Carousel />
        <Hero />
        <Cards />
        <Featurette />
      </div>
    );
  }
}

export default LandingPage;
