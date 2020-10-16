const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const { username, email, password } = req.body;

  User.find(
    {
      $or: [{ username: username }, { email: email }],
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      } else if (previousUsers.length > 0) {
        if (previousUsers[0].username === username) {
          return res.send({
            success: false,
            message: "Error: An account with this username already exists.",
          });
        } else if (previousUsers[0].email === email) {
          return res.send({
            success: false,
            message: "Error: An account with this email already exist.",
          });
        }
      }

      const user = new User();

      user.username = username;
      user.email = email.toLowerCase();
      user.password = user.generateHash(password);

      user.save((err, user) => {
        if (err) {
          return res.status(400).json({
            err: "NOT able to save user in DB",
          });
        }

        res.json({
          success: true,
          message: "User created",
          username: user.username,
          email: user.email,
          id: user._id,
        });
      });
    }
  );
};



exports.signin = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne(
    { email: email },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Email does not exists",
        });
      }

      if (!user.authenticate(password, user.password)) {
        return res.status(401).json({
          error: "Email and password do not match",
        });
      }

      //Create token
      const token = jwt.sign({ _id: user._id }, "onceuponatimeinasmallhouse");

      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });

      //send response to front end
      const { _id, username, email } = user;
      return res.json({
        token,
        user: {
          _id,
          username,
          email,
        },
      });
    }
  );
};


exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout Successfully"
  });
};