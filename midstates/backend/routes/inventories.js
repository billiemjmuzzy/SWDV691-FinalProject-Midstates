const express = require("express");
const router = express.Router();

const Inventory = require("../models/inventory");

router.post("", (req, res, next) => {
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
  inventory.save().then(createdInventory => {
    //everything is Ok, a new resource was created.
    res.status(201).json({
      message: "Inventory item added successfully",
      inventoryId: createdInventory._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const inventory = new Inventory({
    _id: req.body.id,
    image: req.body.image,
    brand: req.body.brand,
    year: req.body.year,
    hours: req.body.hours,
    condition: req.body.condition,
    serial: req.body.serial,
    price: req.body.price,
    description: req.body.description,
  });
  Inventory.updateOne({ _id: req.params.id }, inventory).then((result) => {
    console.log(result);
    res.status(200).json({message: 'Update successful'});
  });
});

router.get("", (req, res, next) => {
  Inventory.find().then((documents) => {
    //Everything is ok
    res.status(200).json({
      message: "Inventories fetched successfully!",
      inventories: documents
    });
  });
});

router.get("/:id",(req, res, next)=>{
  Inventory.findById(req.params.id).then(inventory => {
    if(inventory){
      res.status(200).json(inventory);

    } else {
      res.status(404).json({message: 'Inventory item not found'})
    }
  }

  );
});

router.delete("/:id", (req, res, next) => {
  Inventory.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!" });
  });
});

module.exports = router;
