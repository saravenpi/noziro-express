module.exports = function(app, user) {

   app.get("/api/settings", function(req, res) {
    if (!req.session.id_user) return res.redirect("/app");
        res.send("config")
  });


  app.post("/api/settings", function(req, res) {
        user.findOne({ id: req.session.id_user }).exec(function(err, doc) {
          prefix = req.body.settings.prefix;
          embedcolor = req.body.settings.embedcolor;
          embedimage = req.body.settings.embedimage;
          footerimage = req.body.settings.footerimage;
          afktransmitchannel = req.body.settings.afktransmitchannel;
          afkmode = req.body.settings.afkmode;
          afkmessage = req.body.settings.afkmessage;
          statusmessage = req.body.settings.statusmessage;
          activitystatus = req.body.settings.activitystatus;
          statustype = req.body.settings.statustype;
          abstatus = req.body.settings.abstatus;
          nsstatus = req.body.settings.nsstatus;


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
