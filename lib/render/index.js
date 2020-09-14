module.exports = function(app) {
  app.get("/", function(req, res) {

    res.render("index", {
      user: {
        username: req.session.username,
        avatar: req.session.avatar,
        userid: req.session.id_user
      }
    });
  });
};
