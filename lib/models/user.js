module.exports = function(mongoose) {

var guildSchema = new mongoose.Schema({
  id: String,
  bio: String
})

var guild = mongoose.model("guild",guildSchema);


};
