module.exports = function(app) {
  app.get("/app/selfbot", function(req, res) {

    res.render("app/selfbot", {
      username: req.session.username,
      avatar: req.session.avatar,
      userid: req.session.id_user,
    });
  });
};
