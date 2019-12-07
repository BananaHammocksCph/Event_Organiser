const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap

let db = require("../db");
const User = db.Mongoose.model("user", db.UserSchema, "user");

router.get("/", function(req, res) {
  let status = 200;

  User.find({}, function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json({
      status: status,
      data: users
    });
  });
});

router.post("/", function(req, res) {
  let user = new User();
  user.Name = req.body.Name;
  user.Email = req.body.Email;

  let status = 200;
  user.save(function(err) {
    if(err) {
        status = 400;
      };
    });
    res.json({
      status: status,
    });
});

router.get("/:id", function(req, res) {
  let status = 200;
    User.findById(req.params.ID, function (err, user) {
        if (err) {
          res.send(err);
        }
        res.json({
          status: status,
          data: user
        });
    });
  });

router.put("/:id", function(req, res) {
  return;
});

router.delete("/:id", function(req, res) {
 let status = 200;
 User.remove(
   {
     _id: req.params.ID
   },
   function(err, user) {
     if (err) {
       status = 400;
     }
     res.json({
       status: status,
     });
   }
 );
});

module.exports = router;