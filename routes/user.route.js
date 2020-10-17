const express = require("express");
const router = express.Router();

const  {getUserById, getUser } = require("../controllers/user.controller");

router.param("userId", getUserById);

router.get("/user/:userId", getUser);

module.exports = router;