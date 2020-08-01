const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const inventoriesRoutes = require("./routes/inventories")

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
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/inventories",inventoriesRoutes);

module.exports = app;
