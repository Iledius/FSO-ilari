import React from "react";
import ShowButton from "./ShowButton";

const Country = ({ countriesToShow = [], setFilter, filter }) => {
  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countriesToShow.length === 1) {
    const ctr = countriesToShow[0];
    return (
      <div>
        <h1>{ctr.name}</h1>
        Capital - {ctr.capital}
        <div>population - {ctr.population}</div>
        <h2> languages </h2>
        <p>
          {ctr.languages.map((language) => (
            <div>
              {"\u2B24"}
              {language.name}
            </div>
          ))}
        </p>
        <img src={ctr.flag} width={100} height={70} alt="Flag" />
      </div>
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
