const express = require("express");

const InventoriesController = require("../controllers/inventories");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post(
  "",
  checkAuth,
  extractFile,
  InventoriesController.createInventory
);

router.put(
  "/:id",
  checkAuth,
  extractFile,
  InventoriesController.updateInventory
);

router.get("", InventoriesController.getInventories);

router.get("/:id", InventoriesController.getInventory);

router.delete("/:id", checkAuth, InventoriesController.deleteInventory);

module.exports = router;
