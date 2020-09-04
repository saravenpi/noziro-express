module.exports = function(app, total, request, cors, bodyParser) {

app.use(cors())
app.use(bodyParser.json());

  app.get("/new", function(req, res) {
    res.render("new", {
      data: {
        traffic: req.session.traffic
      }
    });
  });



  app.post("/new", function(req, res) {




console.log(req.body.username);
console.log(req.body.launchtime);

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
  console.log('request successful!  Server responded with:', body);
});

total.findOne({ description: "haha" }).exec(function(err, doc) {
  doc.views = doc.views + 1;
  doc.save();
console.log("new traffic data")
  res.render("new", {
    data: {
      traffic: req.session.traffic
    }
  });

});


  });
};
