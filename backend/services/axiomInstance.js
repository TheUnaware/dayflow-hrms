const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://example-api.com", // change if needed
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = axiosInstance;
