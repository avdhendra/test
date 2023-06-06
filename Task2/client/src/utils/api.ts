import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const api = axios.create({
  baseURL: process.env.REACT_APP_API
});

export default api;