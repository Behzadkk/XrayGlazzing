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
    this.showCategory();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.setState(
        { isLoading: true, category: this.props.match.params.category },
        () => this.showCategory()
      );
    }
  }

  showCategory = () => {
    const products = this.props.products.filter(
      p => p.group === this.props.match.params.category.toLowerCase()
    );
    this.setState({
      products: products,
      banner: products[0].banner[0],
      isLoading: false
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
