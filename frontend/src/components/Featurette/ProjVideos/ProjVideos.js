import React from "react";

const ProjVideos = () => (
  <div>
    <h2 className="featurette-heading text-center my-5">Recent Projects</h2>
    <div className="d-flex flex-wrap">
      <div className="col-md-6 px-0 mb-4 d-flex">
        <div className="mr-2 w-100">
          <iframe
            className="w-100"
            height="250px"
            title="XRAY1"
            src="https://www.youtube.com/embed/5-2xqdQunkQ"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="col-md-6 px-0 mb-4 d-flex">
        <div className=" w-100 mr-2">
          <iframe
            className="w-100"
            height="250px"
            title="XRAY2"
            src="https://www.youtube.com/embed/HHseXtRRWgE"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="col-md-6 px-0 mb-4 d-flex">
        <div className=" w-100 mr-2">
          <iframe
            className="w-100"
            height="250px"
            title="XRAY3"
            src="https://www.youtube.com/embed/799qfo4xjBU"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
);
export default ProjVideos;
