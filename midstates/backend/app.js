const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const Inventory = require("./models/inventory");

const app = express();

// Connect to Database
mongoose.connect(
  process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => {
      console.log("Connected to Database");
  })
  .catch(() =>{
    console.log('Connection Failed')
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
  const inventories = [
    {
      id: 1,
      image: "http://dummyimage.com/110x196.bmp/cc0000/ffffff",
      brand: "aenean sit",
      year: 2004,
      hours: 554,
      condition: "new",
      serial: "4T1BF3EK7BU932948",
      price: "$815.85",
      description:
        "vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing",
    },
    {
      id: 2,
      image: "http://dummyimage.com/177x144.jpg/5fa2dd/ffffff",
      brand: "id sapien",
      year: 2007,
      hours: 515,
      condition: "new",
      serial: "4T1BF3EKXAU261130",
      price: "$11994.91",
      description:
        "quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla",
    },
    {
      id: 3,
      image: "http://dummyimage.com/175x241.bmp/ff4444/ffffff",
      brand: "neque",
      year: 1999,
      hours: 681,
      condition: "used",
      serial: "1D7RE2GK1BS938632",
      price: "$5658.12",
      description:
        "maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi",
    },
  ];
  //everything is ok
  res.status(200).json({
    message: "Inventories fetched successfully!",
    inventories: inventories,
  });
});

module.exports = app;
