const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const cron = require("node-cron");
var request = require("request");
var url = require("url");
var fetch = require("node-fetch");
var cors = require('cors');

var bodyParser = require('body-parser');
var rp = require("request-promise");
var DiscordOauth2 = require("discord-oauth2");
var oauth = new DiscordOauth2();




mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



var userSchema = new mongoose.Schema({
  id: String,
  bio: {type: String, default: "anonymous user ^^"},
})

var user = mongoose.model("user",userSchema);


require("./motor")(app, express, session);
require("./render/index")(app);
require("./render/logout")(app);
require("./door/index")(app, mongoose, fetch, url, oauth, user)
require("./render/app")(app);
require("./render/app/selfbot")(app);
const listener = app.listen(process.env.PORT || 5000);
