//
// in the DAO we do this //
// - initiate the connection with db
// - filter the resturants with the filter object that we prepared in the controller with the query that we create
// - return to the controller all final data after filtering and getting the needed pages
//

import { ObjectId } from "mongodb";

// defining the variable where our result from database will be stored in
let restaurants;

export default class RestaurantsDAO {
  //
  // this method is used to initiate the connection with db
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("restaurants");
    } catch (e) {
      console.error(
        `unable to establicsh a collection handle in restaurantsDAO: ${e}`
      );
    }
  }

  //
  // this method is used to filter the resturants with the filter object that we prepared in the controller
  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    //
    // this query is used to filter the restaurants as needed
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    //
    // cursor is the final data that's returned after filtering all restaurants
    let cursor;
    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`unable to issue find command, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    //
    // this is all final data after filtering and getting the needed pages
    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);
      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `unable to cursor to array or proble counting documents, ${e}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }

  static async getRestaurantById(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$restaurant_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ];

      return await restaurants.aggregate(pipeline).next();
    } catch (e) {
      console.log(`somthing went wrong in getRestaurantById: ${e}`);
      throw e;
    }
  }

  static async getCuisines() {
    let cuisines = [];
    try {
      cuisines = await restaurants.distinct("cuisine");
      return cuisines;
    } catch (e) {
      console.log(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }
}
