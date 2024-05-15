import "./App.css";

import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";

import { useEffect, useState } from "react";

async function getWeatherInfo(url) {
    const response = await fetch(url);
    return await response.json();
}

function getWeatherIcon(data) {
    switch (data.weather[0].icon) {
        case "01d" || "01n":
            return clearIcon;

        case "02d" || "02n":
            return cloudIcon;

        case "03d" || "03n":
            return drizzleIcon;

        case "04d" || "04n":
            return drizzleIcon;

        case "09d" || "09n":
            return rainIcon;

        case "10d" || "10n":
            return rainIcon;

        case "13d" || "13n":
            return snowIcon;

        default:
            return clearIcon;
    }
}

export default function App() {
    const [weatherIcon, setWeatherIcon] = useState(cloudIcon);
    const [weatherInfo, setWeatherInfo] = useState({
        humidity: 0,
        windRate: 0,
        temperature: 0,
        location: "",
    });

    const [location, setLocation] = useState("");
    function handleInputChange(event) {
        if (event) setLocation(event.target.value);
    }

    async function onSubmit(event) {
        event.preventDefault();

        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${
                import.meta.env.VITE_API_KEY
            }`;
            const data = await getWeatherInfo(url);
            if (data) {
                setWeatherInfo({
                    humidity: data.main.humidity,
                    location: data.name,
                    temperature: data.main.temp,
                    windRate: data.main.speed,
                });
                setWeatherIcon(getWeatherIcon(data));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container">
                <form onSubmit={onSubmit} className="top-bar">
                    <input
                        type="text"
                        className="cityInput"
                        placeholder="search"
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="search-icon">
                        <img src={searchIcon} alt="" />
                    </button>
                </form>
                <div className="weather-image">
                    <img src={weatherIcon} alt="" />
                </div>
                <div className="weather-temp">
                    {weatherInfo.temperature}&deg;c
                </div>
                <div className="weather-location">{weatherInfo.location}</div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidityIcon} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity-percent">
                                {weatherInfo.humidity}%
                            </div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={windIcon} alt="" className="icon" />
                        <div className="data">
                            <div className="wind-rate">
                                {weatherInfo.windRate} km/h{" "}
                            </div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
