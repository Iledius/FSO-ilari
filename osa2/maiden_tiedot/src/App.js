import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Components/Filter";
import Country from "./Components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
      console.log(response.data);
    });
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.includes(filter)
  );

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Country
        countriesToShow={countriesToShow}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default App;
