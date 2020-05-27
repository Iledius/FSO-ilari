import React, { useState, useEffect } from "react";
import axios from "axios";

const ACCESS_KEY = process.env.REACT_APP_API_KEY;

const DetailedCountry = ({ ctr }) => {
  const [weatherData, setWeatherData] = useState([]);
  const params = {
    access_key: ACCESS_KEY,
    query: ctr.name,
  };
  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        setWeatherData(response.data);
      });
  });
  let crnt = weatherData.current;
  let temp = 0;
  let wind = [];

  if (crnt !== undefined) {
    temp = crnt.temperature;
    wind.speed = crnt.wind_speed;
    wind.dir = crnt.wind_dir;
    wind.icon = crnt.weather_icons;
  }

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
      <h3>Weather in {ctr.capital}</h3>
      <p> temperature: {temp} Celsius</p>
      <img src={wind.icon} width={100} height={70} alt="Flag" />
      <p>
        wind: {wind.speed} mph - direction {wind.dir}
      </p>
    </div>
  );
};

export default DetailedCountry;
