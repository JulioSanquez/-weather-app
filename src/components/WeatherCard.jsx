import React, { useState } from 'react'

const WeatherCard = ({weather, temperature, isCelsius, changeUnitTemperature}) => {
  console.log(weather)
  return (
    <article className='weatherCard'>
        <h1>Weather App</h1>
        <h3>{weather.name}, {weather.sys.country}</h3>
        <section className='weatherCard-body'>
            <div>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="Clima" />
            </div>
            <ul>
                <li>{ weather.weather[0].description }</li>
                <li>Wind speed: { weather.wind.speed } m/s</li>
                <li>Clouds: { weather.clouds.all } %</li>
                <li>Pressure: { weather.main.pressure } hPa</li>
            </ul>
        </section>
        <p>{isCelsius ? `${temperature.celsius}  C°` : `${temperature.fahrenheit}  F°` }</p>
        <button className='weatherCard-button' onClick={changeUnitTemperature}> Change to {isCelsius ? "°F":"°C"}  </button>
    </article>
  )
}

export default WeatherCard