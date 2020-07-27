const express = require("express");
const app = express();

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

app.use("/api/inventories", (req, res, next) => {
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

  res.status(200).json({
    message: "Inventories fetched successfully!",
    inventories: inventories,
  });
});

module.exports = app;
