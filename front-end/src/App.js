import React, { useState, useEffect } from 'react';
import { open_cage } from './services/api';

import './App.css';

import { fetchBingImage } from "./services/bing_search_img";

function App() {

  const [city, setCity] = useState("");
  const [img, setIMG] = useState('');

  useEffect(()=>{
    fetchBingImage().then(setIMG);
    getUserLocation();
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

  return (
    <div className="App" style={{ backgroundImage: `url(${img})` }}>
      CHALLENGE CHARLIE
      <p>{city}</p>
    </div>
  );
}

export default App;
