module.exports = function(mongoose) {

var userSchema = new mongoose.Schema({
  id: String,
  bio: {type: String, default: "anonymous user ^^"},
})

var user = mongoose.model("user",userSchema);


};
