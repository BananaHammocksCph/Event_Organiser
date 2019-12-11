const express = require("express");
const connectionRoutes = require("./routes/connection");
const router = express.Router();

router.use("/connections", connectionRoutes);
module.exports = router;
