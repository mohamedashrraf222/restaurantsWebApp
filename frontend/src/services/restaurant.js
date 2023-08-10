import http from "../http-common";
import axios from "axios";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`restaurants?page=${page}`);
  }

  get(id) {
    return http.get(`restaurants/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`restaurants?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return http.post(`restaurants/review`, data);
  }
  updateReview(data) {
    return http.put(`restaurants/review`, data);
  }

  //
  // I think we will edit this function to pass the user Id also not the only review id
  deleteReview(reviewId, userId) {
    return http.delete(`restaurants/review?id=${reviewId}`, { data: { user_id: userId } });
  }

  getCuisines() {
    return http.get("restaurants/cuisines");
  }

  login(user){
    return http.post('users/login', user)
  }

  signUp(user){
    return http.post('users/signup', user)
  }
}

export default new RestaurantDataService();
