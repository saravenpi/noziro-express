module.exports = function(app, user) {
  app.get("/app", (req, res) => {



      if (!req.session.username) return res.redirect("./");

      if(!req.session.bio){

        user.find({ id: req.session.id_user }).exec(function(err, doc) {

        req.session.bio = doc[0].bio

        });
      }



      res.render("app", {
        username: req.session.username,
        avatar: req.session.avatar,
        userid: req.session.id_user,
        bio: req.session.bio
      });




    });





};
