module.exports = function(mongoose) {

var guildSchema = new mongoose.Schema({
  name: String,
  id: String,
  description: {type: String, default: "A random guild."},
  date: {type: Date, default: Date.now},
  members: Array,
  owner: String,
  channels: Array,
  icon: {type: String, default: "https://cdn.glitch.com/cd441c7f-4758-44d8-96a5-9f223a9d3cc5%2FCopy%20of%20hazl.png?v=1586296665489"}

})

var guild = mongoose.model("guild",guildSchema);


};
