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


var totalSchema = new mongoose.Schema({
  description: {type: String, default: "haha"},
  views: Number

});

var total = mongoose.model("total", totalSchema);

var hourSchema = new mongoose.Schema({
  description: {type: String, default: "hoho"},
  stats: [Number]

});

var hour = mongoose.model("hour", hourSchema);

var daySchema = new mongoose.Schema({
  description: {type: String, default: "hihi"},
  stats: [Number]

});

var day = mongoose.model("day", daySchema);




require("./motor")(app, express, session);
require("./render/index")(app);
require("./render/new")(app, total, request, cors, bodyParser);
require("./render/total")(app, total);
require("./render/stats")(app, hour, total, day)
require("./render/schedulesim")(app, total, hour, day)
require("./dayschedule")(cron, total, hour, day)
require("./hourschedule")(cron, total, hour)


const listener = app.listen(process.env.PORT || 5000)
