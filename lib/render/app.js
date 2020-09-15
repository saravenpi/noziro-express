module.exports = function(app, user) {
  app.get("/app", (req, res) => {



      if (!req.session.id_user) return res.redirect("./");

      if(!req.session.bio){

        user.find({ id: req.session.id_user }).exec(function(err, doc) {

        req.session.bio = doc[0].bio;


        });
      }


      user.find({ id: req.session.id_user }).exec(function(err, doc) {

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


        res.render("app", {
          user: {
            username: req.session.username,
            avatar: req.session.avatar,
            userid: req.session.id_user,
            bio: doc[0].bio
          },
          settings: {
            prefix: doc[0].prefix,
            embedcolor: doc[0].embedcolor,
            embedimage: doc[0].embedimage,
            footerimage: doc[0].footerimage,
            afktransmitchannel: doc[0].afktransmitchannel,
            afkmode: doc[0].afkmode,
            afkmessage: doc[0].afkmessage,
            statusmessage: doc[0].statusmessage,
            activitystatus: doc[0].activitystatus,
            statustype: doc[0].statustype,
            abstatus: doc[0].abstatus,
            nsstatus: doc[0].nsstatus
          }




        });
      });







    });





};
