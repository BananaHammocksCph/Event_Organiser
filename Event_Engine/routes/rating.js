const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap

const db = require("../db");
const Rating = db.Mongoose.model("rating", db.RatingSchema, "rating");

router.get("/ratings", function(req, res) {
  return;
});

router.post("/ratings", function(req, res) {
  return;
});

router.get("/ratings/:id", function(req, res) {
  return;
});

router.put("/ratings/:id", function(req, res) {
  return;
});

router.delete("/ratings/:id", function(req, res) {
  return;
});

module.exports = router;