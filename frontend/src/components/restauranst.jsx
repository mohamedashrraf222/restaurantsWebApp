import React, { useState, useEffect } from "react";
import RestaurantDataService from "./../services/restaurant";
import { Link, useNavigate } from "react-router-dom";

function Restaurant({ id, user }) {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  // this function is used to set the restaurants accourding to the id which is given to it
  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then((response) => {

        setRestaurant(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // this useEffect is created to make the restaurants loaded when the page start and every time the id change
  useEffect(() => {
    getRestaurant(id);
  }, [id]);

  const deleteReview = (reviewId, index, userId) => {
    RestaurantDataService.deleteReview(reviewId, userId)
      .then((response) => {
        setRestaurant((prevState) => {
          // here we are removing the review from the frontend
          const newr = prevState.reviews.splice(index, 1);
          return {
            ...prevState,
            reviews: newr,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const navigate = useNavigate();

  const myNavigation = (url, dataObject) => {

    navigate(url, { state: dataObject });
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>
            {restaurant.cuisine}
            <br />
            <strong>Address: </strong>
            {restaurant.address.building} {restaurant.address.street},{" "}
            {restaurant.address.zipcode}
          </p>
          <Link
            to={"/restaurants/" + id + "/review"}
            className="btn btn-primary"
          >
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}
                          <br />
                          <strong>User: </strong>
                          {review.name}
                          <br />
                          <strong>Date: </strong>
                          {review.date}
                        </p>
                        {user && user.id === review.user_id && (
                          <div className="row">
                            <a
                              onClick={() =>
                                deleteReview(review._id, index, user.id)
                              }
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                            >
                              Delete
                            </a>

                            <button
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                              onClick={() => {
                                myNavigation(`/restaurants/${id}/review`, {
                                  currentReview: review,
                                  user: user
                                });
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
}

export default Restaurant;
