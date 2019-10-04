import React, { Component } from "react";
import Carousel from "../components/Carousel/Carousel";
import Hero from "../components/Hero/Hero";
import Cards from "../components/Cards/Cards";
import Featurette from "../components/Featurette/Featurette";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Carousel photos={photos} />
        <Hero />
        <Cards />
        <Featurette />
      </div>
    );
  }
}

export default LandingPage;

const photos = [
  {
    source:
      "https://cdn.pixabay.com/photo/2015/05/15/14/21/architecture-768432_960_720.jpg"
  },
  {
    source:
      "https://cdn.pixabay.com/photo/2013/04/11/19/46/louvre-102840_960_720.jpg"
  }
];
