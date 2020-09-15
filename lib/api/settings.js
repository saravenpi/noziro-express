module.exports = function(app, user) {

   app.get("/api/settings", function(req, res) {
    if (!req.session.id_user) return res.redirect("/app");
        res.send("settings")
  });


  app.post("/api/settings", function(req, res) {
        user.findOne({ id: req.session.id_user }).exec(function(err, doc) {
          console.log(body);
          doc[0].prefix = req.body.prefix;
          doc[0].embedcolor = req.body.embedcolor;
          doc[0].embedimage = req.body.embedimage;
          doc[0].footerimage = req.body.footerimage;
          doc[0].afktransmitchannel = req.body.afktransmitchannel;
          doc[0].afkmode = req.body.afkmode;
          doc[0].afkmessage = req.body.afkmessage;
          doc[0].statusmessage = req.body.statusmessage;
          doc[0].activitystatus = req.body.activitystatus;
          doc[0].statustype = req.body.statustype;
          doc[0].abstatus = req.body.abstatus;
          doc[0].nsstatus = req.body.nsstatus;


          doc.save();


          req.session.prefix = req.body.prefix;
          req.session.embedcolor = req.body.embedcolor;
          req.session.embedimage = req.body.embedimage;
          req.session.footerimage = req.body.footerimage;
          req.session.afktransmitchannel = req.body.afktransmitchannel;
          req.session.afkmode = req.body.afkmode;
          req.session.afkmessage = req.body.afkmessage;
          req.session.statusmessage = req.body.statusmessage;
          req.session.activitystatus = req.body.activitystatus;
          req.session.statustype = req.body.statustype;
          req.session.abstatus = req.body.abstatus;
          req.session.nsstatus = req.body.nsstatus;
          //res.redirect("app")
    });



  });


}
