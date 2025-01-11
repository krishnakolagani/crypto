const express = require("express");
const statsRoute = require("./routes/stats.route");
const deviationRoute = require("./routes/deviation.route");

const app = express();
app.use(express.json());

app.use(statsRoute);
app.use(deviationRoute);

module.exports = app;
