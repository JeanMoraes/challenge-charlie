import React, { useState, useEffect } from 'react';
import { open_cage, open_weather } from './services/api';

import './App.css';

import { fetchBingImage } from "./services/bing_search_img";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [img, setIMG] = useState('');

  useEffect(()=>{
    async function initialState(){
      await fetchBingImage().then(setIMG);
      await getUserLocation();
    }
    initialState();

  }, []);

  async function getUserLocation(){
    navigator.geolocation.getCurrentPosition( async function(position) {
      const userPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
      //console.log(userPosition);

      const response = await open_cage.get(`?q=${userPosition.lat},${userPosition.lng}&key=${process.env.REACT_APP_API_KEY_OPEN_CAGE}`);
      const userCity = response.data.results[0].components.city;  
      setCity(userCity);

    });
  }

  async function getWeatherbyCity(e){
    e.preventDefault();

    const response = await open_weather.get(`?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY_OPEN_WEATHER }&lang=pt_br`);
    const info = response.data;
    setWeather(info);
    //console.log(info);
  }


  return (
    <div className="App" style={{ backgroundImage: `url(${img})` }}>
      
      <div className="box-temperature">
      CHALLENGE CHARLIE
      <br/>
      <form onSubmit={ getWeatherbyCity }>
          <input
            name="city"
            value={city}
            onChange={ e => setCity(e.target.value) }
            autoComplete="off"
          />
          <button type="submit">
            Ver
          </button>

          <br/>
          <p> { weather ? "HOJE: " + weather.list[0].main.temp + "ºC" : ""} </p>
          <p> { weather ? "Condições: " + weather.list[0].weather[0].description : ""} </p>
          <p> { weather ? "Vento: " + weather.list[0].wind.speed + "Km/h" : ""} </p>
          <p> { weather ? "Humidade: " + weather.list[0].main.humidity + "%" : ""} </p>
          <p> { weather ? "Pressão: " + weather.list[0].main.pressure + "hPA" : ""} </p>
          <hr />
          <p> { weather ? "AMANHÃ: " + weather.list[1].main.temp + "ºC" : ""} </p>
          <p> { weather ? "DEPOIS DE AMANHÃ: " + weather.list[2].main.temp + "ºC" : ""} </p>
      </form>
      </div>

    </div>
  );
}

export default App;
