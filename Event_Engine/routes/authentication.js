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
    }
    console.log("COMPARING NOW ");
    console.log(user);
    console.log("DB DOCUMENT: " + user.Password)
    console.log("FROM REST CALL : "+ Password)
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
