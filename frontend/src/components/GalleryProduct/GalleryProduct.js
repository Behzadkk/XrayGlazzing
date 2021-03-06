import React, { Component } from "react";
import "./GalleryProduct.css";
import Spinner from "../Spinner/Spinner";

class GalleryProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      images: [],
      currentIndex: null
    };
    this.closeModal = this.closeModal.bind(this);
    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    this.renderImageContent = this.renderImageContent.bind(this);
  }
  componentDidMount() {
    this.fetchImages();
  }
  fetchImages = () => {
    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    fetch("/api/gallery/" + this.props.match.params.product)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const images = resData.photos.map(photo => photo.source);

        this.setState({ isLoading: false, images, product: resData.category });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  renderImageContent(src, index) {
    return (
      <div key={index} onClick={e => this.openModal(e, index)}>
        <img src={src} key={index} alt={src} />
      </div>
    );
  }
  openModal(e, index) {
    this.setState({ currentIndex: index });
  }
  closeModal(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState({ currentIndex: null });
  }
  findPrev(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1
    }));
  }
  findNext(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  }
  captialize(words) {
    return words
      .split("_")
      .map(w => w.substring(0, 1).toUpperCase() + w.substring(1))
      .join(" ");
  }

  render() {
    return (
      <div className="gallery-container">
        <h2 className="display-4 text-center m-5">
          {this.captialize(this.props.match.params.product)}
        </h2>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <div className="gallery-grid">
              {this.state.images.map(this.renderImageContent)}
            </div>
            <GalleryModal
              closeModal={this.closeModal}
              findPrev={this.findPrev}
              findNext={this.findNext}
              hasPrev={this.state.currentIndex > 0}
              hasNext={this.state.currentIndex + 1 < this.state.images.length}
              src={this.state.images[this.state.currentIndex]}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

class GalleryModal extends Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.keyCode === 27) this.props.closeModal();
    if (e.keyCode === 37 && this.props.hasPrev) this.props.findPrev();
    if (e.keyCode === 39 && this.props.hasNext) this.props.findNext();
  }
  render() {
    const {
      closeModal,
      hasNext,
      hasPrev,
      findNext,
      findPrev,
      src
    } = this.props;
    if (!src) {
      return null;
    }
    return (
      <div>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal container">
          <div className="modal-body">
            <a
              href="#"
              className="modal-close"
              onClick={closeModal}
              onKeyDown={this.handleKeyDown}
            >
              &times;
            </a>
            {hasPrev && (
              <a
                href="#"
                className="modal-prev"
                onClick={findPrev}
                onKeyDown={this.handleKeyDown}
              >
                &lsaquo;
              </a>
            )}
            {hasNext && (
              <a
                href="#"
                className="modal-next"
                onClick={findNext}
                onKeyDown={this.handleKeyDown}
              >
                &rsaquo;
              </a>
            )}
            <img src={src} alt={src} />
          </div>
        </div>
      </div>
    );
  }
}

export default GalleryProduct;
