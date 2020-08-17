import React, { useState, useEffect } from 'react';
import { open_cage, open_weather } from './services/api';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';

import { DisplayInfo, SideBar, SubmitButton } from './style';
import GlobalStyle from './styles/GlobalStyle';

import { fetchBingImage } from "./services/bing_search_img";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [img, setIMG] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const response = await open_weather.get(`?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY_OPEN_WEATHER}&lang=pt_br`);
    const info = response.data;
    setWeather(info);
    //console.log(info);
    setLoading(false);
  }

  return (
    <>
    <GlobalStyle /> 
    <div className="App" style={{ backgroundImage: `url(${img})` }}>
      
      <DisplayInfo>
        <div className="box_info">
          <h1>
            { weather ? Math.round(weather.list[0].main.temp) + "ºC": ""}
          </h1>
          <h2>
            { weather ? weather.city.name : ""}
          </h2>
        </div>
      </DisplayInfo>

      <SideBar>
        <div className="box-temperature">
          <form onSubmit={ getWeatherbyCity }>
              <input
                name="city"
                value={city}
                onChange={ e => setCity(e.target.value) }
                autoComplete="off"
              />
              <SubmitButton loading={ loading ? 1 : 0}>
                { loading ? <FaSpinner color="#FFF" size={30} /> : <AiOutlineSearch color="#FFF" size={30} /> }
              </SubmitButton>
          </form>
          
        { weather && 
          <div className="list-info">
            <fieldset>
              <legend>HOJE:</legend>
              <p>{ weather.list[0].main.temp } ºC</p>
            </fieldset>

            <fieldset>
            <legend>Condições</legend>
            <p>{ weather.list[0].weather[0].description }</p>
            </fieldset>

            <fieldset>
              <legend>Vento</legend>
              <p>{ weather.list[0].wind.speed } Km/h</p>
            </fieldset>

            <fieldset>
              <legend>Humidade</legend>
              <p>{ weather.list[0].main.humidity } %</p>
            </fieldset>

            <fieldset>
              <legend>Pressão</legend>
              <p>{ weather.list[0].main.pressure } hPA</p>
            </fieldset>

            <fieldset>
              <legend>AMANHÃ:</legend>
              <p>{ weather.list[1].main.temp } ºC</p>
            </fieldset>

            <fieldset>
              <legend>DEPOIS DE AMANHÃ</legend>
              <p>{ weather.list[2].main.temp } ºC</p>
            </fieldset>
          </div>
        }
         
        </div>
      </SideBar>
      </div>
    </>
  );
}

export default App;
