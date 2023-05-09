//
// what we do in the controller //
// - get the data from the DAO
// - defining our query
// - define our filters object that will be passed to the DAO
// - getting the result data from the DAO of restaurants
// - creating the response object and rerurn it in the res for the api
//
import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsCtrl {
  // this method is used to get the data from the DAO
  static async apiGetRestaurants(req, res, next) {
    //
    // at the first we are defining our query
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    //
    // this will be our filters object that will be passed to the DAO
    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    //
    // getting the result data from the DAO of restaurants
    const { restaurantsList, totalNumRestaurants } =
      await RestaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      });

    //
    // creating the response object
    let response = {
      restaurants: restaurantsList,
      page: page,
      fileters: filters,
      entries_per_page: restaurantsPerPage,
      total_result: totalNumRestaurants,
    };

    res.json(response);
  }

  static async apiGetRestaurantById(req, res, next) {
    // at this method we take the 'id' from the 'id' in params then we pass it to the api DAO to get the restaurant by the id
    try {
      let id = req.params.id || {};
      let restaurant = await RestaurantsDAO.getRestaurantById(id);
      if (!restaurant) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(restaurant);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      let cuisines = await RestaurantsDAO.getCuisines();
      res.json(cuisines);
    } catch (e) {
      console.log(`api ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
