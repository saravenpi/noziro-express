module.exports = function(app, total, truetotal, dayuser, request, cors, bodyParser) {

app.use(cors())
app.use(bodyParser.json());

  app.get("/api/new", function(req, res) {
    res.render("new", {
      data: {
        traffic: req.session.traffic
      }
    });
  });



  app.post("/api/new", function(req, res) {



    request.post(process.env.DISCORDWEBHOOK, {
      "headers":{
        'Content-Type': 'application/json'
      },
      "body":JSON.stringify({

      "username": "Noziro Stats",

      "embeds": [{

        "title": "Selfbot Log",

      "fields": [
		{
			"name": '👤User tag:',
			"value": req.body.username
		},
    {
      "name": "⏱Launchtime:",
      "value": "in " + req.body.launchtime + "ms"
    },
    {
      "name": "📈More informations:",
      "value": "Check at the last 24 hours stats [here](https://noziro.herokuapp.com/stats)"
    }],
    "color": 4437377
  }]

})
},function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('request failed:', err);
  }

});

total.findOne({ description: "haha" }).exec(function(err, doc) {
  doc.views = doc.views + 1;
  doc.save();

  res.render("new", {
    data: {
      traffic: req.session.traffic
    }
  });

});


dayuser.findOne({ description: "hehe" }).exec(function(err, doc) {

  if (doc.users.includes(req.body.username)) {

} else {

    var array = doc.users
    array.push(req.body.username)
   doc.users = array
    doc.save();

    truetotal.findOne({ description: "huhu" }).exec(function(err, wf) {
      wf.views = wf.views + 1;
      wf.save();

      res.render("new", {
        data: {
          traffic: req.session.traffic,
          truetraffic: req.session.truetraffic
        }
      });

    });




}



});






  });
};
