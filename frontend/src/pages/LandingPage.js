import React, { Component } from "react";
import Carousel from "../components/Carousel/Carousel";
import Hero from "../components/Hero/Hero";
import Featurette from "../components/Featurette/Featurette";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Carousel photos={photos} />
        <Hero />
        <Featurette products={this.props.products} />
      </div>
    );
  }
}

export default LandingPage;

const photos = [
  {
    source:
      "https://res.cloudinary.com/dadhpknsf/image/upload/v1570612420/qki1vcaekz0vhtea8kdo.jpg"
  },
  {
    source:
      "https://res.cloudinary.com/dadhpknsf/image/upload/v1570612431/syrc3kf5zjumok957ukq.jpg"
  },
  {
    source:
      "https://res.cloudinary.com/dadhpknsf/image/upload/v1570612438/pkhyx5zagnn4ioep92l9.jpg"
  },
  {
    source:
      "https://res.cloudinary.com/dadhpknsf/image/upload/v1570612533/x50reayn8hw23w4ua73v.jpg"
  },
  {
    source:
      "https://res.cloudinary.com/dadhpknsf/image/upload/v1570612407/mdkpifmrcionjjhm01ai.jpg"
  }
];
