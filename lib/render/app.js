module.exports = function(app) {
  app.get("/app", function(req, res) {
    res.render("app", {
      data: {
        traffic: req.session.traffic
      }
    });
  });
};
