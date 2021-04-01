import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const SingleResult = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country[0].capital}`
      )
      .then((response) => {
        setWeatherInfo(response.data);
      });
  }, []);

  return country.map(({ name, capital, population, languages, flag }) => (
    <div key={name}>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <p>population: {population.toLocaleString('fi-FI')}</p>
      <h2>languages</h2>
      <ul>
        {languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img height="200" src={flag} alt={`flag of ${name}`} />
      <h2>Weather in {capital}</h2>
      {weatherInfo ? (
        <div>
          <p>
            <strong>Temperature: </strong>
            {weatherInfo.current.temperature} Celsius
          </p>
          <img src={weatherInfo.current.weather_icons[0]} alt="Weather icon" />
          <p>
            <strong>Wind: </strong>
            {weatherInfo.current.wind_speed} km/h direction{' '}
            {weatherInfo.current.wind_dir}
          </p>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  ));
};

export const MultipleResults = ({ countries, handler }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.numericCode}>
          {country.name}{' '}
          <button onClick={() => handler(country.name)}>show</button>
        </div>
      ))}
    </div>
  );
};
