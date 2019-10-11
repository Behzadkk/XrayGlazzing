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
import Spinner from "./components/Spinner/Spinner";
import GalleryProduct from "./components/GalleryProduct/GalleryProduct";
import Uploader from "./components/Uploader/Uploader";
import ShowProject from "./components/ShowProject/ShowProject";

class App extends Component {
  state = { selectedProduct: "", products: null, isLoading: true };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = () => {
    this.setState({ isLoading: true });
    fetch(`/api/products`)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ products: resData.products, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <MainNavigation navbarData={navbarData} />
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <div>
              <Switch>
                <Route
                  path="/"
                  render={() => <LandingPage products={this.state.products} />}
                  exact
                />
                <Route
                  path="/products/:product"
                  render={props => (
                    <ProductsPage {...props} products={this.state.products} />
                  )}
                />
                <Route
                  path="/gallery"
                  render={() => <GalleryPage products={this.state.products} />}
                />
                <Route
                  path="/photos/:product"
                  render={props => <GalleryProduct {...props} />}
                />
                <Route path="/projects" component={ProjectsPage} exact />
                <Route
                  path="/:product/projects"
                  render={props => <ProjectsPage {...props} />}
                />
                <Route
                  path="/projects/:id"
                  render={props => <ShowProject {...props} />}
                />
                <Route path="/drawings" component={DrawingsPage} />
                <Route path="/about" component={AboutUsPage} />
                <Route path="/admin" component={AdminsPage} />
                <Route path="/upload" component={Uploader} />
              </Switch>
            </div>
          )}
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
