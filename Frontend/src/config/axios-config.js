import axios from 'axios';

const renderBackendUrl = 'https://trailback.onrender.com';
const instance = axios.create({
  // baseURL: 'http://localhost:5001',
  baseURL:renderBackendUrl
});

export default instance;