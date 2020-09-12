module.exports = function(app) {
  app.get("/app", function(req, res) {
    res.render("app", {
      username: req.session.username,
      avatar: req.session.avatar,
      userid: req.session.id_user,
    });
  });
};
