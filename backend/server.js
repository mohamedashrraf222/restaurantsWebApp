import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";
import path from "path";

const app = express();

// this is a middleware to avoide network errors
app.use(cors());

// using express.json() so that our server can accept json in the body of the request
app.use(express.json());
app.use("/api/v1/restaurants", restaurants);

app.use(express.static('dist'));


export default app;