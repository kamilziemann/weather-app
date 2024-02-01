import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.weatherapi.com/v1/',
  params: {
    key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
    lang: 'pl',
  },
});

export default api;
