import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [clima, setClima] = useState()
  const [darkTheme, setDarkTheme] = useState(false)

  const handleChangeClima = (e) => {
    const cli = {
      d1: ['01d', 'clear sky'],
      d2: ['02d', 'few clouds'],
      d3: ['10d', 'shower rain'],
      d4: ['11d', 'thunderstorm'],
      d5: ['13d', 'snow'],
      d6: ['50d', 'mist'],
      n1: ['01n', 'clear sky'],
      n2: ['02n', 'few clouds'],
      n3: ['09n', 'shower rain'],
      n4: ['11n', 'thunderstorm'],
      n5: ['13n', 'snow'],
      n6: ['50n', 'mist']
    }

    if ( cli[e.target.value] == undefined) return

    setClima({img:cli[e.target.value][0], description: cli[e.target.value][1]})
  }

  const newCallAPISearch = (cityName) => {
    const API_KEY = 'c55f8959d11cd76c2227cfd788d024da'
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    
    setClima()

    axios
    .get(URL)
    .then(({data}) => {
      setWeather(data)
    })
    .catch( err => console.log(err))
  }

  const changeUnitTemperature = () => setIsCelsius(!isCelsius)

  const success = ({coords:{latitude, longitude }}) => {
    setCoords({
            latitude,
            longitude
          })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  useEffect(() => {
    if(coords){
      const {latitude, longitude} = coords
      const API_KEY = 'c55f8959d11cd76c2227cfd788d024da'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`

      axios
        .get(URL)
        .then(({data}) => {
          const kelvin = data.main.temp
          const celsius = (kelvin - 273.15).toFixed()
          const fahrenheit = (celsius * 9/5 ) + 32
          setTemperature({celsius, fahrenheit})
          setWeather(data)
        })
        .catch( err => console.log(err))
    }
  }, [coords])

  return (
    <div className={ `${darkTheme && 'App'}`}>
      <div className="cambiar-clima">
          <div>
            <h2>Cambiar Clima</h2>
            <select className='select-search' name="clima" onChange={handleChangeClima}>
              <option value="d1"> Day - Clear Sky </option>
              <option value="d2"> Day - Clouds </option>
              <option value="d3"> Day - Rain </option>
              <option value="d4"> Day - Thunderstorm </option>
              <option value="d5"> Day - Snow </option>
              <option value="d6"> Day - Mist </option>
              <option value="n1"> Nigth - Clear Sky </option>
              <option value="n2"> Nigth - Clouds </option>
              <option value="n3"> Nigth - Rain </option>
              <option value="n4"> Nigth - Thunderstorm </option>
              <option value="n5"> Nigth - Snow </option>
              <option value="n6"> Nigth - Mist </option>
            </select>
          </div>
          <div className='dark-theme' onClick={() => setDarkTheme(!darkTheme)} >
            <p> { darkTheme ? "Ligth" : "Dark"} </p>
          </div>
        </div>
      <div className="App2" style={weather&&{backgroundImage: `url(./${clima ? clima.img : weather.weather[0].icon}.webp)`}}>
        {weather 
          ? 
            <WeatherCard 
              weather={weather} 
              temperature={temperature} 
              isCelsius={isCelsius}
              setIsCelsius={setIsCelsius}
              changeUnitTemperature={changeUnitTemperature}
              newCallAPISearch={newCallAPISearch}
              clima={clima}
            /> 
          :
            <Loader />
        }
      </div>
    </div>
  )
}

export default App
