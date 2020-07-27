const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const Inventory = require("./models/inventory");

const app = express();

// Connect to Database
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

// Parses the JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
// Post
app.post("/api/inventories", (req, res, next) => {
  const inventory = new Inventory({
    image: req.body.image,
    brand: req.body.brand,
    year: req.body.year,
    hours: req.body.hours,
    condition: req.body.condition,
    serial: req.body.serial,
    price: req.body.price,
    description: req.body.description,
  });
  console.log(inventory);
  //everything is Ok, a new resource was created.
  res.status(201).json({
    message: "Inventory item added successfully",
  });
});
// Get
app.get("/api/inventories", (req, res, next) => {
  Inventory.find().then(documents => {
    //Everything is ok
    res.status(200).json({
      message: "Inventories fetched successfully!",
      inventories: documents
    });
  });
});

module.exports = app;
