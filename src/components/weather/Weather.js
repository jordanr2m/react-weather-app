import React from 'react'
import "./Weather.css"

const Weather = () => {
    let date = new Date().toLocaleDateString();

    return (
        <section className='--100vh --center-all'>
            <div className='container weather --flex-center'>
                <div className='weather-app --text-light'>
                    <h1>Weather App</h1>
                    <p>{date}</p>

                    <div className='--form-control --my2'>
                        <input type='text' placeholder='Search city name' />
                    </div>

                    <div className='result --card --my2'>
                        <h2>Abuja</h2>
                        <div className='icon'>
                            <img src='' alt='Clouds' />
                        </div>
                        <p>Temp: 23°C</p>
                        <p>Weather: Clouds</p>
                        <p>Temp Range: 23°C / 24°C</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Weather
