import axios from 'axios';

const open_cage = axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1/json'
});

export {open_cage}
