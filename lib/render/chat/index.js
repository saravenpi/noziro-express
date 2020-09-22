module.exports = function(app) {

  app.get("/app/chat", function(req, res) {


      if (!req.session.username || !req.session.uuid) return res.redirect("/app")

        res.render("app/chat", {
            user: {
                username: req.session.username,
                avatar: req.session.avatar,
                userid: req.session.id,
                uuid: req.session.uuid
              }
});




});
}
