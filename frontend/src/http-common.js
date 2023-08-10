import axios from "axios";

export default axios.create({
  baseURL: "https://restaurants-web-app.onrender.com/api/v1/",
  // baseURL: "http://localhost:8000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});
