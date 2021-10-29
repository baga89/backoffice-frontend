import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create();

api.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

api.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    toast.error('Dogodila se neočekivana pogreška.');
    console.log(error);
  }

  return Promise.reject(error);
});

export const setTokenHeader = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token} `;
};

export default api;
