const express = require("express");
const router = express.Router();

module.exports = router;

const db = require("../db");
const Connection = db.Mongoose.model("connection", db.ConnectionSchema, "connection");

router.post("/", function(req, res) {
});
