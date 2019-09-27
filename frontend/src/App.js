import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import MainNavigation from "./components/Navigation/MainNav";
import navbarData from "./components/Navigation/navbarData";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import Footer from "./components/Footer/Footer";
import GalleryPage from "./pages/GalleryPage";
import ProjectsPage from "./pages/ProjectsPage";
import DrawingsPage from "./pages/DrawingsPage";
import AboutUsPage from "./pages/AboutUsPage";
import AdminsPage from "./pages/AdminsPage";

class App extends Component {
  state = { selectedProduct: "" };

  selectHandler = link => {
    this.setState({ selectedProduct: link });
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
              <Route
                path="/products/"
                render={() => (
                  <ProductsPage selectedProduct={this.state.selectedProduct} />
                )}
              />
              <Route path="/gallery" component={GalleryPage} />
              <Route path="/projects" component={ProjectsPage} />
              <Route path="/drawings" component={DrawingsPage} />
              <Route path="/about" component={AboutUsPage} />
              <Route path="/admin" component={AdminsPage} />
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
