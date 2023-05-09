import axios from "axios";

export default axios.create({
  baseURL: "https://restaurants-web-app.onrender.com/api/v1/restaurants",
  headers: {
    "Content-Type": "application/json",
  },
});
