import axios from 'axios';

const open_cage = axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1/json'
});

const open_weather = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/forecast'
});

export { open_cage, open_weather }
