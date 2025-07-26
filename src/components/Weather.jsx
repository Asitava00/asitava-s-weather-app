import React, { useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/sun.png";
import storm_icon from "../assets/storm.png";
import rain_icon from "../assets/rain.png";
import windy_icon from "../assets/windy.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");

  const search = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
        import.meta.env.VITE_APP_ID
      }&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        alert(data.message); // "city not found"
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      search(city);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ✅ Function to choose correct icon
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return clear_icon;
      case "Rain":
        return rain_icon;
      case "Thunderstorm":
        return storm_icon;
      case "Clouds":
        return windy_icon;
      case "Drizzle":
        return rain_icon;
      case "Mist":
      case "Fog":
        return windy_icon;
      default:
        return clear_icon;
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={search_icon}
          alt="Search"
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
      </div>

      {weatherData ? (
        <>
          {/* ✅ Dynamic Icon */}
          <img
            src={getWeatherIcon(weatherData.weather[0].main)}
            alt="Weather Icon"
            className="weather-icon"
          />

          <p className="temperature">{weatherData.main.temp}°C</p>
          <p className="location">{weatherData.name}</p>
          <p className="description">
            {weatherData.weather[0].description}
          </p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={windy_icon} alt="Wind Icon" />
              <div>
                <p>{weatherData.wind.speed} m/s</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;
