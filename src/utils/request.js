import axios from "axios";

const request = axios.create({
  baseURL: "/api",
  headers: {
    "context-type": "application/x-www-form-urlencoded",
  },
});

request.interceptors.request.use(
  (config) => {
    // config.headers
    return config;
  },
  (err) => {
    console.log(err);
  }
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    console.log(err);
  }
);

export default request;
