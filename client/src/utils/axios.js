import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // or your deployed backend
  withCredentials: true, // important for cookies to be sent
});

export default instance;
