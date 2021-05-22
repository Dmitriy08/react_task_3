import React from "react";
import planetsApiService from "services/planets";

const withPlanet = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => {
    return (
      <WrappedComponent {...props} getData={planetsApiService.getPlanet} />
    );
  };

  return hocComponent;
};

export default withPlanet;
