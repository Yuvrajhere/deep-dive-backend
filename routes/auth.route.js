const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const { signup } = require('../controllers/auth.controller');

router.post(
  "/signup",
  [
    check("username", "username should be at least 3 char").isLength({min: 3}),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 6 char").isLength({min: 6})
  ],
  signup
);

module.exports = router;