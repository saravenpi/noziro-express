module.exports = function(app, user) {

   app.get("/api/config", function(req, res) {
    if (!req.session.id) return res.redirect("/app");

   res.send("config")
  });


  app.post("/api/config", function(req, res) {

        var bio = req.body.user.bio;

    user.findOne({ id: req.session.id }).exec(function(err, new_profil) {
      new_profil.bio = bio;
      new_profil.save();
      res.redirect("/app")
    });


    
  });


}
