const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  imagePath: {
    type: String,
   },
  brand: {
    type: String,
  },
  year: {
    type: String,
  },
  hours: {
    type: String,
  },
  condition: {
    type: String,
  },
  serial: {
    type: String,
  },
  price: {
    type: String,
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
