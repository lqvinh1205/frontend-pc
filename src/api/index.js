import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8'
};

const api = axios.create({
  baseURL: 'http://localhost:5000/',
  headers
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.status) {
      case 401: {
        window.location.href = '/login';
        break;
      }
      default:
        return Promise.reject(error);
    }
  }
);
export default api;
