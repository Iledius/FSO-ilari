import React from "react";
import ShowButton from "./ShowButton";
import DetailedCountry from "./DetailedCountry"

const Country = ({ countriesToShow = [], setFilter, filter }) => {
  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countriesToShow.length === 1) {
    const ctr = countriesToShow[0];
    
    return (
        <DetailedCountry ctr={ctr}/>
    );
  }
  return (
    <div>
      {countriesToShow.map((country) => (
        <div>
          {country.name}-
          <ShowButton
            filter={filter}
            setFilter={setFilter}
            countryToShow={country.name}
          />
        </div>
      ))}
    </div>
  );
};

export default Country;
