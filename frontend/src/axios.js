import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.15.147.101:3001', // Reemplaza con la URL de tu backend
});

export default instance;