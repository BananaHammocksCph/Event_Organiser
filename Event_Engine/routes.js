const express = require("express");
const eventRoutes = require("./routes/event");
const userRoutes = require("./routes/user");
const ratingRoutes = require("./routes/rating");
const authRoutes = require("./routes/authentication");
const router = express.Router();

router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/events", ratingRoutes);
router.use("/", authRoutes);
module.exports = router;
