// configure axios proxy
import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

export default request;