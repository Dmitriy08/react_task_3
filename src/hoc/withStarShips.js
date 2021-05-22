import React from "react";
import StarShipsApiService from "services/starships";

const withStarShips = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => {
    return (
      <WrappedComponent {...props} getData={StarShipsApiService.getStarShip} />
    );
  };

  return hocComponent;
};

export default withStarShips;
