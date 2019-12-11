const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var connectionSchema = new mongoose.Schema({
  User_ID: Number,
  Date: { type: Date },
  IP: String
});

module.exports = {
  Mongoose: mongoose,
  ConnectionSchema: connectionSchema,
};
