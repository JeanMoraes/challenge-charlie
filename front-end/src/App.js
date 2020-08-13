import React, { useState, useEffect } from 'react';
import { open_cage } from './services/api';

function App() {

  const [city, setCity] = useState("");

  useEffect(()=>{
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
    <div className="App">
      CHALLENGE CHARLIE
      <p>{city}</p>
    </div>
  );
}

export default App;
