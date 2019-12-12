const express = require("express");
const router = express.Router();

module.exports = router;

const db = require("../db");
const Connection = db.Mongoose.model("connection", db.ConnectionSchema, "connection");

const ipHelper = require("../services/ipHelper");
router.post("/", function(req, res) {
  let ip = req.body.ip;
  let lat = req.body.lat;
  let lon = req.body.lon;

  let connection = new Connection();
  connection.Ip = ip;
  connection.Date = req.body.date;
  connection.User_ID = req.body.id;

  // Saves a connection based on the HTTP REQUEST
  connection.save(function (err) {
    if (err) {
      return res.send(err);
    };
  });
  
  ipHelper.getLocationFromIp(ip, function(err, location) {
    // converts the string coordinates returned by ip translator into an object
    let locObj = ipHelper.convertLocationString(location.loc);
    // compares returned IP coordaintes to coordaintes sent in HTTP REQUEST
    let distance = ipHelper.getDistanceFromLatLonInKm(locObj.lat, locObj.lon, lat, lon);
    if (distance < 10)
      return res.json({"valid": "true"});

  return res.json({"valid":"false"});
  });
});
