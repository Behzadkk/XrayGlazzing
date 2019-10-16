import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

import AuthContext from "./context/authContext";
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
import ShowProject from "./components/ShowProject/ShowProject";
import AuthPage from "./pages/Auth";
import CategoryPage from "./pages/CategoryPage";

class App extends Component {
  state = {
    selectedProduct: "",
    products: null,
    isLoading: true,
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

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
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation navbarData={navbarData} />
            {this.state.isLoading ? (
              <Spinner />
            ) : (
              <div>
                <Switch>
                  <Route
                    path="/"
                    render={() => (
                      <LandingPage products={this.state.products} />
                    )}
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
                    render={() => (
                      <GalleryPage products={this.state.products} />
                    )}
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
                  <Route
                    path="/category/:category"
                    render={props => <CategoryPage {...props} />}
                  />

                  {this.state.token && <Redirect from="/auth" to="/" exact />}
                  {!this.state.token && (
                    <Route path="/auth" component={AuthPage} />
                  )}
                  {this.state.token && (
                    <Route path="/admin" component={AdminsPage} />
                  )}
                  <Redirect from="*" to="/" />
                </Switch>
              </div>
            )}
            <Footer />
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
