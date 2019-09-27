import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <div>
    <MDBFooter className="font-small pt-4 mt-4">
      <MDBContainer fluid className="container text-center text-md-left">
        <MDBRow>
          <MDBCol md="3" sm="6" className="d-none d-sm-block text-left">
            <h5 className="title">Menu</h5>
            <ul className="pl-2">
              <li className="list-unstyled">
                <Link to="/">Home</Link>
              </li>
              <li className="list-unstyled">
                <a href="#!">Windows</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Doors</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Shop Fronts</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Roofing System</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Bespoke Glazing</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3" sm="6" className="d-none d-sm-block text-left">
            <h5 className="title">Useful Links</h5>
            <ul className="pl-2">
              <li className="list-unstyled">
                <a href="#!">Projects</a>
              </li>
              <li className="list-unstyled">
                <Link to="/gallery">Gallery</Link>
              </li>
              <li className="list-unstyled">
                <a href="#!">Drawings</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3" sm="6" className="text-left">
            <h5 className="title">About Us</h5>
            <ul className="pl-2">
              <li className="list-unstyled">
                <a href="#!">Why Us</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Contact Us</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Site Map</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Request A Free Quote</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Book A Free Appointment</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3" sm="6" className="d-none d-sm-block text-left">
            <h5 className="title">Contact Info</h5>
            <ul className="pl-2">
              <li className="list-unstyled">
                <div className="row">
                  <div className="col-1">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="col-10">
                    Unit 5, Brook Lane Business Center, London, TW8 0PP
                  </div>
                </div>
              </li>
              <li className="list-unstyled">
                <div className="row">
                  <div className="col-1">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="col-10">0208 111 111 5</div>
                </div>
              </li>
              <li className="list-unstyled">
                <div className="row">
                  <div className="col-1">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="col-10">074 5050 3030</div>
                </div>
              </li>
              <li className="list-unstyled">
                <div className="row">
                  <div className="col-1">
                    <i className="fas fa-at"></i>
                  </div>
                  <div className="col-10">info@xrayglazing.co.uk</div>
                </div>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.xrayglazing.co.uk/">Xray Glazing Ltd</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  </div>
);

export default Footer;
