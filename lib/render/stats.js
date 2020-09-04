module.exports = function(app, hour, total,day) {
  app.get("/stats", function(req, res) {
    day.find({ description: "hihi"}).exec(function(err, meow) {
      req.session.day = meow[0].stats
    hour.find({ description: "hoho"}).exec(function(err, woof) {

      req.session.array = woof[0].stats
      total.find({ description: "haha"}).exec(function(err, doc) {

        req.session.traffic = doc[0].views

        res.render("stats", {
          data: {
            traffic: req.session.traffic,
            array: req.session.array,
            day: req.session.day
          }
        });


    });

});

  });






  });
};
