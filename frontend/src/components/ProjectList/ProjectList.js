import React from "react";

const ProjectList = props => {
  return (
    <div className="card-group">
      {props.projects.map((project, i) => (
        <div
          key={i}
          className="col-sm-6 col-xl-4  px-0 mb-4 d-flex"
          onClick={() => props.projectpreview(project)}
        >
          <div className="card">
            <img
              className="card-img-top height-inherit"
              src={project.photos[0]}
              alt={project.name}
            />
            <div className="card-body text-center">
              <h5 className="card-title d-inline">{project.name}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
