import React, { useState } from 'react'
import "./Weather.css"

const Weather = () => {
    let date = new Date().toLocaleDateString();

    const [input, setInput] = useState("");
    // State that represents an object which will store the data from our API call (data is returned as an object)
    const [weather, setWeather] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true); // Must set to true initially so that no city data is shown on page load
    const [errorMesg, setErrorMsg] = useState("");

    // API links & info
    const api = {
        url: "https://api.openweathermap.org/data/2.5/",
        key: "563f7ae8e9f247c3fee33f3e8fa5a3e0",
        units: "imperial",
    }

    const iconURL = "http://openweathermap.org/img/w/";

    // Grab the input of what user types
    const getInput = (e) => {
        setInput(e.target.value);
    }

    // When the user presses enter key, we get the weather data
    const getWeatherData = (e) => {
        // Handle error first (if user hits enter without typing a city)
        if (e.key === "Enter" && input === "") {
            setErrorMsg("Input cannot be empty")
            setError(true)
        }

        // Input is not empty. Now, we will handle fetch request. The city is whatever the user types that is stored in the input state. Turn promise from fetch into data we can work with using .then
        if (e.key === "Enter" && input !== "") {
            fetch(`${api.url}weather?q=${input}&units=${api.units}&appid=${api.key}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setWeather(data); // set the weather equal to data from API call
                setInput(""); // clear the input field
                setError(false); // set error state to false once we get our data
            })
        }
    }

    return (
        <section className='--100vh --center-all'>
            <div className='container weather --flex-center'>
                <div className='weather-app --text-light'>
                    <h1>Weather App</h1>
                    <p className='date'>{date}</p>

                    {/* Hook up the getInput function to onChange & set the value equal to whatever is stored as input */}
                    <div className='--form-control --my2'>
                        <input type='text' placeholder='Search city name'
                            onChange={getInput}
                            value={input}
                            onKeyDown={getWeatherData}
                        />
                    </div>

                    {/* Check if there is an error & show error message. If no error, then result div is shown */}
                    {error ? (
                        <p>{errorMesg}</p>
                    ) : (
                        <div className='result --card --my2'>
                            <h2>{weather.name}, {weather.sys.country}</h2>
                            <div className='icon'>
                                <img src={iconURL + weather.weather[0].icon + ".png"} alt={weather.weather[0].main} />
                            </div>
                            <p>Temp: {Math.round(weather.main.temp)}°F</p>
                            <p>Weather: {weather.weather[0].main}</p>
                            <p>Temp Range: {Math.round(weather.main.temp_min)}°F / {Math.round(weather.main.temp_max)}°F</p>
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}

export default Weather
