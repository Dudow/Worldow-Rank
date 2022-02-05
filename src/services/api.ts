import axios from 'axios';

export const apiV3 = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

export const apiV2 = axios.create({
  baseURL: 'https://restcountries.com/v2',
});
