const express = require("express");
const UserController = require('../controllers/user');
const router = express.Router();

router.post("/new-user", UserController.createUser);

router.post("/login", UserController.userLogin);

module.exports = router;
