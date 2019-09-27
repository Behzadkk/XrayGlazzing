import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import MainNavigation from "./components/Navigation/MainNav";
import navbarData from "./components/Navigation/navbarData";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import Footer from "./components/Footer/Footer";
import GalleryPage from "./pages/GalleryPage";

class App extends Component {
  state = { selectedProduct: "mirrors", page: "landing" };

  selectHandler = link => {
    this.setState({ selectedProduct: link, page: "product" });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <MainNavigation
            navbarData={navbarData}
            onSelection={this.selectHandler}
          />

          <div>
            <Switch>
              <Route path="/" component={LandingPage} exact />
              <Route path="/gallery" component={GalleryPage} />
              <Route
                path="/products/"
                render={() => (
                  <ProductsPage selectedProduct={this.state.selectedProduct} />
                )}
              />
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
