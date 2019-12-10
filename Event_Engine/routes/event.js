const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap
// const EventHandler = require('../helpers/EventHandler');

let db = require("../db");
const Event = db.Mongoose.model("event", db.EventSchema, "event");
const User = db.Mongoose.model("user", db.UserSchema, "user");

router.get("/", function(req, res) {
  let status = 200;

  Event.find({}, function(err, users) {
    if (err) {
      return res.send(err);
    }
    return res.json({
      status: status,
      data: users
    });
  });
});

router.get("/:id", function (req, res) {
  Event.findById(req.params.id, function (err, event) {
    let status = 200;
    if (err)
      return res.send(err);
    res.json({
      status: status,
      data: event
    });
  });
});

router.post("/", function(req, res) {
  let event = new Event();
  event.Description = req.body.Description;
  event.Name = req.body.Name;
  event.Type = req.body.Type;
  event.Catering = req.body.Catering;
  event.Catering_Desc = req.body.Catering_Desc;
  event.Date = req.body.Date;
  event.Location = req.body.Location;

// Calls automated processes related to received Event object
// EventHandler.handleEvent(event);

  let status = 200;
  event.save(function(err) {
    if (err) {
      return res.send(err);
    }
  });
  return res.json({
    status: status
  });
});

router.put("/:id", function(req, res) {
  let status = 200;

  let event = new Event();
  event.Description = req.body.Description;
  event.Name = req.body.Name;
  event.Type = req.body.Type;
  event.Catering = req.body.Catering;
  event.Catering_Desc = req.body.Catering_Desc;
  event.Date = req.body.Date;
  event.Location = req.body.Location;

  Event.findByIdAndUpdate(
    req.params.id,
    event,
    { new: true },
    (err, retEvent) => {
      if (err) return res.status(500).send(err);
      return res.json({
        data: retEvent,
        status: status
      });
    });
});

router.delete("/:id", function(req, res) {
  let status = 200;
  Event.remove(
    {
      _id: req.params.id
    },
    function(err, user) {
      if (err) {
       return res.send(err);
      }
      return res.json({
        status: status
      });
    }
  );
});

// @RETURNS all users associated with an event
router.get("/:id/users", function (req, res) {
  let status = 200;
  Event.findById(req.params.id, function (err, event) {
    if (err)
      return res.send(err);
    res.json({
      status: status,
      data: event.Users
    });
  });
});

// Gets a specific user object from within event.Users
router.get("/:id/users/:user_id", function (req, res) {
  let status = 200;
  Event.find({ _id: req.params.id, 'users._id': req.params.user_id }, function (err, user) {
    if (err)
      return res.send(err);
    res.json({
      status: status,
      data: user
    });
  });
});

// Adds a user to an event
router.post("/:id/users/", function (req, res) {
  let status = 200;
  Event.findOne({ _id: req.params.id }).catch(function (err) {
    return res.send(err);
}).then(function ( event) {
  User.findById(req.body.Id).catch(function (err) {
    return res.send(err)}).then(function (user) {
    event.Users.push(user);
    event.save();
      res.json({
        status: status,
        data: event.Users
      });
  });
});
});

// Adds a user to an event
router.delete("/:id/users/:user_id", function (req, res) {
  let status = 200;
  Event.findOne({ _id: req.params.id }).catch(function (err) {
    return res.send(err);
  }).then(function (event) {
    event.Users.pull(req.params.user_id);
      event.save();
      res.json({
        status: status,
        data: event.Users
      });
    });
  });


module.exports = router;