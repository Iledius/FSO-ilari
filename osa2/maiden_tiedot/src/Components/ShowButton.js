import React from "react";

const ShowButton = ({ setFilter, countryToShow }) => {
  const showFilter = () => {
    setFilter(countryToShow);
  };

  return <button onClick={showFilter}>show</button>;
};

export default ShowButton;
