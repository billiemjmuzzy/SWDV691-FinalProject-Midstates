const express = require("express");
const multer = require("multer");

const Inventory = require("../models/inventory");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const inventory = new Inventory({
      imagePath: url + "/images/" + req.file.filename,
      brand: req.body.brand,
      year: req.body.year,
      hours: req.body.hours,
      condition: req.body.condition,
      serial: req.body.serial,
      price: req.body.price,
      description: req.body.description,
    });
    inventory.save().then((createdInventory) => {
      //everything is Ok, a new resource was created.
      res.status(201).json({
        message: "Inventory item added successfully",
        inventory: {
          id: createdInventory._id,
          imagePath: createdInventory.imagePath,
          brand: createdInventory.brand,
          year: createdInventory.year,
          hours: createdInventory.hours,
          condition: createdInventory.condition,
          serial: createdInventory.serial,
          price: createdInventory.price,
          description: createdInventory.description,
        },
      });
    });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath: url + "/images/" + req.file.filename
    }
    const inventory = new Inventory({
      _id: req.body.id,
      imagePath: imagePath,
      brand: req.body.brand,
      year: req.body.year,
      hours: req.body.hours,
      condition: req.body.condition,
      serial: req.body.serial,
      price: req.body.price,
      description: req.body.description
    });
    console.log(inventory);
    Inventory.updateOne({ _id: req.params.id }, inventory).then((result) => {
      console.log(result);
      res.status(200).json({ message: "Update successful" });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const inventoryQuery = Inventory.find();
  let fetchedInventories;
  if(pageSize && currentPage){
    inventoryQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
 inventoryQuery.then(documents => {
    return Inventory.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Inventory items fetched successfully!",
        inventories: fetchedInventories,
        maxInventories: count
      });
    });
  });

router.get("/:id", (req, res, next) => {
  Inventory.findById(req.params.id).then((inventory) => {
    if (inventory) {
      res.status(200).json(inventory);
    } else {
      res.status(404).json({ message: "Inventory item not found" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Inventory.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!" });
  });
});

module.exports = router;
