const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Regsiter a new user >>>
router.post("/register", userController.submitData);

// To delete a user by id >>>
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
