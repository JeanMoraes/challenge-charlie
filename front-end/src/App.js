import React, { useState, useEffect } from 'react';

function App() {

  useEffect(()=>{
    getUserLocation();
  }, []);

  async function getUserLocation(){
    navigator.geolocation.getCurrentPosition( async function(position) {
      const userPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
      console.log(userPosition);
    });
  }

  return (
    <div className="App">
      CHALLENGE CHARLIE
    </div>
  );
}

export default App;
