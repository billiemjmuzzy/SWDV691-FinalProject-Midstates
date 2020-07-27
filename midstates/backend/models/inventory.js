const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  image: {
    type: String,
   },
  brand: {
    type: String,
  },
  year: {
    type: Number,
  },
  hours: {
    type: Number,
  },
  condition: {
    type: String,
  },
  serial: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
