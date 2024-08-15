import React, { useState, useEffect } from "react";
import { kelvinToCelsius } from "../../lib/utils";
import "./WeatherViewer.css";

const WeatherViewer = () => {

  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;
  const city = "colombo";

  useEffect(() => {
    const getWeatherAndTemperature = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const json = await response.json();
        // console.log(json); // for debugging purposes
        setWeatherData({
          location: `${json.city.name}, ${json.city.country}`,
          temperature: `${kelvinToCelsius(json.list[0].main.temp)}°C`,
          description: json.list[0].weather[0].main,
          icon: `https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}.png`,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getWeatherAndTemperature();
  }, [api_key, city]);

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="weather-viewer">
      <h2 className="weather-location">{weatherData.location}</h2>
      <div className="weather-info">
        <img
          src={weatherData.icon}
          alt={weatherData.description}
          className="weather-icon"
        />
        <div>
          <p className="weather-temperature">{weatherData.temperature}</p>
          <p className="weather-description">{weatherData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherViewer;
