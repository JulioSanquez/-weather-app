import React, { useState } from 'react'

const WeatherCard = ({weather, temperature, isCelsius, changeUnitTemperature, newCallAPISearch, clima}) => {
  const [place, setPlace] = useState("")

  const handleChangePlace = (e) => {
    setPlace(e.target.value)
  }

  return (
    <article className='weatherCard' >
        <h1>Weather App</h1>
        <h3>{weather.name}, {weather.sys.country}</h3>
        <section className='weatherCard-body'>
            <div className='img'>
                {/* <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="Clima" /> */}
                <img src={`http://localhost:5173/src/assets/${ clima ? clima.img : weather.weather[0].icon}.png`} alt="Clima" />
            </div>
            <div>
              <ul>
                  <li>{ clima ? clima.description : weather.weather[0].description }</li>
                  <li>Wind speed: { weather.wind.speed } m/s</li>
                  <li>Clouds: { weather.clouds.all } %</li>
                  <li>Pressure: { weather.main.pressure } hPa</li>
              </ul>
              <p>{isCelsius ? `${temperature.celsius}  C°` : `${temperature.fahrenheit}  F°` }</p>
              <button className='weatherCard-button' onClick={changeUnitTemperature}> Change to {isCelsius ? "°F":"°C"}  </button>
            </div>
        </section>
        <div>
          <input 
            type="text" 
            value={place}
            onChange={handleChangePlace}
          />
          <button className='weatherCard-button' onClick={ () => newCallAPISearch(place)}>Search</button>
        </div>
    </article>
  )
}

export default WeatherCard