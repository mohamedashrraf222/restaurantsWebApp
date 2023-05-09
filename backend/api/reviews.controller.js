import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsCtrl {
  //
  // this method is used to add new review and it takes data from the body of request then post it to DAO
  static async apiPostReview(req, res, next) {
    // it takes 'restaurantId' from 'restaurant_id' --> json body
    // it takes 'review' from 'text' --> json body
    // it takes 'name' from 'name' --> json body
    // it takes '_id' from 'user_id' --> json body
    try {
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      //
      // sending data to DAO method
      const ReviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        userInfo,
        review,
        date
      );

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.massage });
    }
  }

  //
  // this method is uesed to take the data from the body of the request then send it to the DAO
  static async apiUpdateReview(req, res, next) {
    // it takes 'reviewId' from 'review_id' --> json body
    // it takes 'text' from 'text' --> json body
    try {
      const reviewId = req.body.review_id;
      const text = req.body.text;
      const date = new Date();
      
      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        text,
        date
        );
        
        var { error } = reviewResponse;
        if (error) {
          res.status(400).json({ error });
        }
        
        if (reviewResponse.modifiedCount === 0) {
          throw new Error(
            "unable to update review - user may not be original poster"
            );
          }

          res.json({ status: "success" });
        } catch (e) {
          res.status(500).json({ error: e.message });
    }
  }
  
  static async apiDeleteReview(req, res, next) {
    // it takes 'reviewId' from 'id' of the review --> query
    // it takes 'userId' from 'user_id' --> json body
    try {
      const reviewId = req.query.id;
      // note that it's not standered to take the user_is from req.body and in the production env we make it more complex
      const userId = req.body.user_id;

      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);
      res.json({ status: "success" });

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
