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
    <>
      <div className="cambiar-clima">
        <h2>Cambiar Clima</h2>
        <input type="text" onChange={handleChangeClima} />
      </div>
      <div className="App" style={weather&&{backgroundImage: `url(http://localhost:5173/src/assets/${clima ? clima.img : weather.weather[0].icon}.webp)`}}>
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
    </>
  )
}

export default App
