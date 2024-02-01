import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.weatherapi.com/v1/',
  params: {
    key: 'bf8b1579bc744bec8f9100003240102',
    lang: 'pl',
  },
});

export default api;
