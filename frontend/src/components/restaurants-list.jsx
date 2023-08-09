import React, { useState, useEffect } from "react";
import RestaurantDataService from "./../services/restaurant";
import { Link } from "react-router-dom";

function RestaurantsList(props) {
  // defining some intial states
  // the first state is the restaurants array
  const [restaurants, setRestaurants] = useState([]);
  // this seconed state is the cuisines array
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  // those state are for the form and search values
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };


  // retrive restaurants function is used to get a list of all restaurants and update cuisine state
  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then((res) => {
        setRestaurants(res.data.restaurants);
      })
      .catch((e) => console.log(e));
  };

  // retrive cusines function is used to get a list of all cuisines and update cuisine state
  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((res) => {
        setCuisines(["All Cuisines"].concat(res.data));
      })
      .catch((e) => console.log(e));
  };

  // this refresh list is to invoke retrieveRestaurants function
  const refreshList = () => {
    retrieveRestaurants();
  };

  // this find function is used to find the restuarants we want with dataservice we created in restaurants.js to contact with the server
  // then it setState and retrive the new found restuarants
  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((response) => {
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine) => {
              return <option value={cuisine} key={cuisine}> {cuisine.substring(0, 20)} </option>;
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1" key={`${restaurant.name} ${restaurant.address.zipcode}`}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className="row">
                    <Link
                      to={"/restaurants/" + restaurant._id}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    <a
                      target="_blank"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RestaurantsList;
