import http from "../http-common";
import axios from "axios";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return http.post(`/review`, data);
  }
  updateReview(data) {
    return http.put(`/review`, data);
  }
  //
  // I think we will edit this function to pass the user Id also not the only review id
  deleteReview(reviewId, userId) {
    return http.delete(`/review?id=${reviewId}`, { data: { user_id: userId } });
  }

  getCuisines() {
    return http.get("/cuisines");
  }
}

export default new RestaurantDataService();
