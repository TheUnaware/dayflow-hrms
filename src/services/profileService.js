import axios from "axios";

const API = "http://localhost:5000/api/users";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getProfile = () => {
  return axios.get(`${API}/me`, authHeader());
};

export const updateProfile = (data) => {
  return axios.put(`${API}/me`, data, authHeader());
};
