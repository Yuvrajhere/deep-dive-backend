const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require("../controllers/category.controller");
const { getUserById } = require("../controllers/user.controller");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// create route
router.post("/category/create/:userId", createCategory);

//read route
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//update
router.put("/category/:categoryId/:userId", updateCategory);

//delete
router.delete("/category/:categoryId/:userId", removeCategory);

module.exports = router;