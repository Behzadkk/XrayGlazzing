import React, { Component } from "react";
import Spinner from "../components/Spinner/Spinner";
import PhotoGallery from "../components/PhotoGallery/PhotoGallery";
class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      category: this.props.match.params.category,
      products: null,
      banner: null
    };
  }
  componentDidMount() {
    this.fetchCategory();
  }

  fetchCategory = () => {
    this.setState({ isLoading: true });
    fetch(`/api/category/${this.props.match.params.category}`)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          products: resData.products,
          banner: resData.products[0].banner[0],
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const bannerBackground = {
      backgroundImage: `url(${this.state.banner})`
    };
    return (
      <div className="">
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className="">
              <div className="banner text-center" style={bannerBackground}>
                <h1 className="d-none"> {this.state.category}</h1>
              </div>
              <h1 className="text-center m-5">
                {this.state.category.toUpperCase()}
              </h1>
            </div>
            <div className="container">
              <PhotoGallery products={this.state.products} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default CategoryPage;
