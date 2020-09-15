module.exports = function(app, user) {

   app.get("/api/settings", function(req, res) {
    if (!req.session.id_user) return res.redirect("/app");
        res.send("settings")
  });


  app.post("/api/settings", function(req, res) {
        user.findOne({ id: req.session.id_user }).exec(function(err, doc) {
          doc.prefix = req.body.prefix;
          doc.embedcolor = req.body.embedcolor;
          doc.embedimage = req.body.embedimage;
          doc.footerimage = req.body.footerimage;
          doc.afktransmitchannel = req.body.afktransmitchannel;
          doc.afkmode = req.body.afkmode;
          doc.afkmessage = req.body.afkmessage;
          doc.statusmessage = req.body.statusmessage;
          doc.activitystatus = req.body.activitystatus;
          doc.statustype = req.body.statustype;
          doc.abstatus = req.body.abstatus;
          doc.nsstatus = req.body.nsstatus;


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
