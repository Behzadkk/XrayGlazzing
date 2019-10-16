import React, { Component } from "react";
import { Link } from "react-router-dom";

class DrawingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      drawings: []
    };
  }
  componentDidMount() {
    this.fetchDrawings();
  }
  fetchDrawings = () => {
    this.setState({ isLoading: true });
    fetch("/api/drawings")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const drawings = resData.drawings;

        this.setState({ isLoading: false, drawings });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  render() {
    return (
      <div className="container">
        <h1 className="display-3 text-center m-5">Drawings</h1>
        {!this.state.isLoading && (
          <div>
            {this.state.drawings.map((drawing, i) => {
              return (
                <div key={i}>
                  <h5>{drawing.category.name}</h5>
                  <Link to={drawing.source}>
                    <i className="far fa-file-pdf"></i>Download
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DrawingsPage;
