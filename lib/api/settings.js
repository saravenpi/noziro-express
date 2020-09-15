module.exports = function(app, user) {

   app.get("/api/settings", function(req, res) {
    if (!req.session.id_user) return res.redirect("/app");
        res.send("config")
  });


  app.post("/api/settings", function(req, res) {
        user.findOne({ id: req.session.id_user }).exec(function(err, doc) {
          doc[0].prefix = req.body.settings.prefix;
          doc[0].embedcolor = req.body.settings.embedcolor;
          doc[0].embedimage = req.body.settings.embedimage;
          doc[0].footerimage = req.body.settings.footerimage;
          doc[0].afktransmitchannel = req.body.settings.afktransmitchannel;
          doc[0].afkmode = req.body.settings.afkmode;
          doc[0].afkmessage = req.body.settings.afkmessage;
          doc[0].statusmessage = req.body.settings.statusmessage;
          doc[0].activitystatus = req.body.settings.activitystatus;
          doc[0].statustype = req.body.settings.statustype;
          doc[0].abstatus = req.body.settings.abstatus;
          doc[0].nsstatus = req.body.settings.nsstatus;


          doc.save();

          
          req.session.prefix = req.body.settings.prefix;
          req.session.embedcolor = req.body.settings.embedcolor;
          req.session.embedimage = req.body.settings.embedimage;
          req.session.footerimage = req.body.settings.footerimage;
          req.session.afktransmitchannel = req.body.settings.afktransmitchannel;
          req.session.afkmode = req.body.settings.afkmode;
          req.session.afkmessage = req.body.settings.afkmessage;
          req.session.statusmessage = req.body.settings.statusmessage;
          req.session.activitystatus = req.body.settings.activitystatus;
          req.session.statustype = req.body.settings.statustype;
          req.session.abstatus = req.body.settings.abstatus;
          req.session.nsstatus = req.body.settings.nsstatus;
          //res.redirect("app")
    });



  });


}
