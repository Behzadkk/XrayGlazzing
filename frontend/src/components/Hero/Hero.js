import React from "react";

const Hero = () => (
  <div className="bg-dark text-white p-3">
    <div className="container">
      <div className="d-none d-md-block">
        <h4>
          Xray Glazing manufactures high performance, energy efficient aluminium
          and UPVC windows and doors for architecturally inspired projects
        </h4>
      </div>

      <div className="d-md-none">
        <h4>Xray Glazing</h4>
        <p>
          manufacturing high performance, energy efficient doors and windows
        </p>
      </div>
    </div>
  </div>
);

export default Hero;
