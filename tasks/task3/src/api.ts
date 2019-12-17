import axios from 'axios';

const TIMEOUT = 5000;
const NOT_FOUND_CODE = 404;
const BASE_URL = `http://127.0.0.1:3000`;

const createAPI = (on404) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === NOT_FOUND_CODE) {
      on404();
    }
    throw err
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
