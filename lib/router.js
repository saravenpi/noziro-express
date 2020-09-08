const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const cron = require("node-cron");
var request = require("request");
var cors = require('cors');
var bodyParser = require('body-parser');
var rp = require("request-promise");

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



require("./motor")(app, express, session);
require("./render/index")(app);
require("./render/app")(app);
const listener = app.listen(process.env.PORT || 5000);
