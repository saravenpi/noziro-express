module.exports = function(app, user) {
  app.get("/app", (req, res) => {



      if (!req.session.id_user) return res.redirect("./");

      if(!req.session.bio){

        user.find({ id: req.session.id_user }).exec(function(err, doc) {

        req.session.bio = doc[0].bio;


        });
      }


      user.find({ id: req.session.id_user }).exec(function(err, doc) {
        console.log(doc[0])
      req.session.bio = doc[0].bio;
      req.session.prefix = doc[0].prefix;
      req.session.embedcolor = doc[0].embedcolor;
      req.session.embedimage = doc[0].embedimage;
      req.session.footerimage = doc[0].footerimage;
      req.session.afktransmitchannel = doc[0].afktransmitchannel;
      req.session.afkmode = doc[0].afkmode;
      req.session.afkmessage = doc[0].afkmessage;
      req.session.statusmessage = doc[0].statusmessage;
      req.session.activitystatus = doc[0].activitystatus;
      req.session.statustype = doc[0].statustype;
      req.session.abstatus = doc[0].abstatus;
      req.session.nsstatus = doc[0].nsstatus;

      });


      res.render("app", {
      user: {
        username: req.session.username,
        avatar: req.session.avatar,
        userid: req.session.id_user,
        bio: req.session.bio
      },
      settings: {
        prefix: req.session.prefix,
        embedcolor: req.session.embedcolor,
        embedimage: req.session.embedimage,
        footerimage: req.session.footerimage,
        afktransmitchannel: req.session.afktransmitchannel,
        afkmode: req.session.afkmode,
        afkmessage: req.session.afkmessage,
        statusmessage: req.session.statusmessage,
        activitystatus: req.session.activitystatus,
        statustype: req.session.statustype,
        abstatus: req.session.abstatus,
        nsstatus: req.session.nsstatus
      }
      });




    });





};
