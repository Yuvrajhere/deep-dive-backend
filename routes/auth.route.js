const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signup, signin, signout, isSignedIn, isAuthenticated } = require("../controllers/auth.controller");

router.post(
  "/signup",
  [
    check("username", "username should be at least 3 char").isLength({
      min: 3,
    }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 6 char").isLength({
      min: 6,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").exists(),
  ],
  signin
);

router.get("/signout", signout);


router.get("/testroute", isSignedIn, isAuthenticated, (req, res) => {
  if(!req.auth) {
    return res.json({
      error: "Not authorized!"
    });
  } else {
    res.json(req.auth);
  }
})

module.exports = router;
