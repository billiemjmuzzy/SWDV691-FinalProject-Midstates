const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  imagePath: {
    type: String,
    required: true
   },
  brand: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  hours: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  serial: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  ,
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
