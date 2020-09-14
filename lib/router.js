var express = require("express");
var app = express();
var session = require("express-session");
var mongoose = require("mongoose");
var cron = require("node-cron");
var request = require("request");
var url = require("url");
var fetch = require("node-fetch");
var cors = require('cors');
var bodyParser = require('body-parser');
var rp = require("request-promise");
var Discord = require("discord.js");
var Canvas = require("canvas");
var DiscordOauth2 = require("discord-oauth2");
var oauth = new DiscordOauth2();




mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


////////////////////////////////////////////////////////////:


var userSchema = new mongoose.Schema({
  id: String,
  bio: {type: String, default: "anonymous user ^^"},
})

var user = mongoose.model("user",userSchema);



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


//////////////////////

var truetotalSchema = new mongoose.Schema({
  description: {type: String, default: "huhu"},
  views: Number

});

var truetotal = mongoose.model("truetotal", truetotalSchema);



var dayUser = new mongoose.Schema({
  description: {type: String, default: "hehe"},
  users: [String]

});

var dayuser = mongoose.model("dayuser", dayUser);





var truehourSchema = new mongoose.Schema({
  description: {type: String, default: "hoho"},
  stats: [Number]

});

var truehour = mongoose.model("truehour", truehourSchema);



var truedaySchema = new mongoose.Schema({
  description: {type: String, default: "hyhy"},
  stats: [Number]

});

var trueday = mongoose.model("trueday", truedaySchema);


///////////////////////////////////////::::

require("./motor")(app, express, session);
require("./render/index")(app);
require("./render/logout")(app);
require("./door/index")(app, fetch, url, oauth, user)
require("./render/app")(app, user);
require("./render/api/new")(app, total, truetotal, dayuser, request, cors, bodyParser);
require("./render/stats")(app, hour, total, day, truetotal, truehour, trueday);
require("./dayschedule")(cron, total, hour, day, truetotal, truehour, trueday, dayuser, request);
require("./hourschedule")(cron, total, hour, truetotal, truehour, request);
require("./discordbot")(Discord, Canvas);

const listener = app.listen(process.env.PORT || 5000);
