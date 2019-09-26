import React, { Component } from "react";
import "./App.css";

import MainNavigation from "./components/Navigation/MainNav";
import navbarData from "./components/Navigation/navbarData";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import Footer from "./components/Footer/Footer";

class App extends Component {
  state = { selectedProduct: "mirrors", page: "landing" };

  selectHandler = link => {
    this.setState({ selectedProduct: link, page: "product" });
  };

  render() {
    return (
      <div className="App">
        <MainNavigation
          navbarData={navbarData}
          onSelection={this.selectHandler}
        />
        {this.state.page === "landing" && <LandingPage />}
        {this.state.page === "product" && (
          <ProductsPage selectedProduct={this.state.selectedProduct} />
        )}

        <Footer />
      </div>
    );
  }
}

export default App;
