import Axios from 'axios';

function authRequestInterceptor(config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    //handle everything

    return Promise.reject(error);
  }
);
