const express = require("express");
const eventRoutes = require("./routes/event");
const userRoutes = require("./routes/user");
const ratingRoutes = require("./routes/rating");
const router = express.Router();

router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/events", ratingRoutes);

module.exports = router;
