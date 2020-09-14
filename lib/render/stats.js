module.exports = function(app, hour, total, day, truetotal, truehour, trueday) {
  app.get("/stats", function(req, res) {




    day.find({ description: "hihi"}).exec(function(err, meow) {
      req.session.day = meow[0].stats
    hour.find({ description: "hoho"}).exec(function(err, woof) {

      req.session.array = woof[0].stats
      total.find({ description: "haha"}).exec(function(err, doc) {

        req.session.traffic = doc[0].views



            trueday.find({ description: "hyhy"}).exec(function(err, meow2) {
              req.session.trueday = meow2[0].stats
            truehour.find({ description: "hoho"}).exec(function(err, woof2) {

              req.session.truearray = woof2[0].stats

              truetotal.find({ description: "huhu"}).exec(function(err, doc2) {

                req.session.truetraffic = doc2[0].views





                res.render("stats", {
                  data: {
                    traffic: req.session.traffic,
                    array: req.session.array,
                    day: req.session.day,
                    truetraffic: req.session.truetraffic,
                    truearray: req.session.truearray,
                    trueday: req.session.trueday
                  }
                });




              });

          });

            });

    });

});

  });









  });
};
