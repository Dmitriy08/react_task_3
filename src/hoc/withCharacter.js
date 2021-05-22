import React from "react";
import charactersApiService from "services/characters";

const withCharacter = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => {
    return (
      <WrappedComponent {...props} getData={charactersApiService.getCharacter} />
    );
  };

  return hocComponent;
};

export default withCharacter;
