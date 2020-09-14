module.exports = function(app, user) {

   app.get("/api/config", function(req, res) {
    if (!req.session.id_user) return res.redirect("/app");
        res.send("config")
  });


  app.post("/api/config", function(req, res) {
        user.findOne({ id: req.session.id_user }).exec(function(err, doc) {
          doc.bio = req.body.user.bio;
          doc.save();
          res.redirect("/app")
    });



  });


}
