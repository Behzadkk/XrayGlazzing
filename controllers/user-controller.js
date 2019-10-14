const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

exports.createAUser = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, function(err, existUser) {
    if (err) {
      return res.status(500).send("Error on the server.");
    }
    if (existUser) {
      return res.status(404).send("User Already exist!!");
    }
    if (req.body.adminCode === process.env.ADMIN_CODE) {
      let user = {};
      bcrypt
        .hash(req.body.password, 12)
        .then(hashedPassword => {
          user.email = req.body.email;
          user.password = hashedPassword;
          return user;
        })
        .then(user => {
          User.create(user, function(err, createdUser) {
            if (err) {
              console.log(err);
            } else {
              res.send("user created");
            }
          });
        })
        .catch(err => {
          throw err;
        });
    }
  });
};

exports.userLogin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, function(err, user) {
    if (err) {
      return res.status(500).send("Error on the server.");
    }
    if (!user) {
      return res.status(404).send("No user found.");
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 86400 // expires in 24 hours
      }
    );
    res.status(200).send({ userId: user._id, auth: true, token: token });
  });
};
