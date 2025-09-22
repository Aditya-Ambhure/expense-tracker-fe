
// src/api/api.js
import axios from 'axios';

const API_BASE = 'https://expense-tracker-be-taupe.vercel.app/'; // change at deploy

const api = axios.create({
  baseURL: API_BASE + '/api',
});

// Attach token automatically to every request (reads from localStorage at request time)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
