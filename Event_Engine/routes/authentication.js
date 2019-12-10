const express = require("express");
const router = express.Router();

module.exports = router;

const db = require("../db");
const User = db.Mongoose.model("user", db.UserSchema, "user");

router.post("/login", function (req, res) {
  let status = 200;

  let Email  = req.body.Email;
  let Password = req.body.Password;

  User.findOne({ Email: Email }, function (err, user) {
    if (err) {
      return res.send(err);
    } else if (!user) {
      let err = new Error("User not found.");
      err.status = 401;
      return res.send(err);
    }
    if (user.Password == Password){
    return res.json({
      status: status,
      data: user
    });
  }
  status = 400
    return res.json({
      status: status,
    });
  })
});

router.post("/logout", function (req, res) {
  return;
});
