const express = require("express");
const multer = require("multer");

const Inventory = require("../models/inventory");
const checkAuth = require("../middleware/check-auth");


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
  checkAuth,
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
      creator: req.userData.userId
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
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath: url + "/images/" + req.file.filename;
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
      description: req.body.description,
    });
    console.log(inventory);
    // adding user Id to prevent a different user from deleting the post
    //TODO add the ability for a super admin to update any posts
    Inventory.updateOne({ _id: req.params.id, creator: req.userData.userId }, inventory).then((result) => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful" });
      } else {
        res.status(401).json({message: "Not authorized"});
      }

    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const inventoryQuery = Inventory.find();
  let fetchedInventories;
  if (pageSize && currentPage) {
    inventoryQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  inventoryQuery
    .then(documents => {
      fetchedInventories = documents;
      return Inventory.estimatedDocumentCount();
    })
    .then(estimatedDocumentCount => {
      res.status(200).json({
        message: "Inventory items fetched successfully!",
        inventories: fetchedInventories,
        maxInventories: estimatedDocumentCount
      });
    });
});

router.get("/:id", (req, res, next) => {
  Inventory.findById(req.params.id).then(inventory => {
    if (inventory) {
      res.status(200).json(inventory);
    } else {
      res.status(404).json({ message: "Inventory item not found" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
   // adding user Id to prevent a different user from deleting the post
    //TODO add the ability for a super admin to delete any posts
  Inventory.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then((result) => {
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful" });
    } else {
      res.status(401).json({message: "Not authorized to delete this post"});
    }

  });
}
);

module.exports = router;
