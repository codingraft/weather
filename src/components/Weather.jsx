import { useState, useEffect } from "react";
import "./Weather.css";

const api = {
  key: "3b14352f67737df90f5265baee4b030d",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  const setcount = (e) => {
    if (e.key === 'Enter') {
    setCount(count + 1);
    }
  };


  useEffect(() => {
    
    if (count > 0) {
      setIsLoading(true);
      fetch(
        `${api.base}weather?q=${query}&units=metric&appid=${api.key}`
      )
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        setCount(0)
        setIsLoading(false);
      })
  }
  
  }, [count, query])


  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Decmeber",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      id="wrapper"
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <div className="search_box">
        <input
          type="text"
          className="search_bar"
          placeholder="Search..."
          value={query}
          onKeyPress={setcount}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleClick}>Search</button>
      </div>
      <div className="container">
        <div className="location_container">
          {isLoading && <div>Loading...</div>}
          {!isLoading && weather.name && weather.sys && weather.sys.country && (
            <div className="location">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
            </div>
          )}
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather_container">
          {weather &&
            weather.main && ( // Check if weather and weather.main exist
              <div className="temp">
                {weather ? (
                  <>
                    <div className="degree">
                      {Math.round(weather.main.temp)}°C
                    </div>
                    <div> {weather.weather[0].main}</div>
                  </>
                ) : (
                  <div>Loading weather data...</div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
