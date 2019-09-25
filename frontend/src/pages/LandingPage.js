import React, { Component } from "react";
import Carousel from "../components/Carousel/Carousel";
import Hero from "../components/Hero/Hero";
import Cards from "../components/Cards/Cards";
import Featurette from "../components/Featurette/Featurette";
import Footer from "../components/Footer/Footer";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Carousel />
        <Hero />
        <Cards />
        <Featurette />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
