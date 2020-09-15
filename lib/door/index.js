module.exports = function(app, fetch, url, oauth, user) {


  function _encode(obj) {
    let string = "";

    for (const [key, value] of Object.entries(obj)) {
      if (!value) continue;
      string += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }

    return string.substring(1);
  }

  var redirect = process.env.redirectURL + "/callback";
  var CLIENT_ID = process.env.CLIENT_ID;
  var CLIENT_SECRET = process.env.CLIENT_SECRET;


  app.get("/door", (req, res) => {
    if (req.session.username) {
      res.redirect("door");
    }
    res.redirect(
      `https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`
    );
  });

  app.get("/callback", async (req, res) => {
    if (!req.query.code) throw new Error("NoCodeProvided");
    var code = req.query.code;
    let data = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect,
      scope: "identify",
    };

    params = _encode(data);

    var response = await fetch(`https://discordapp.com/api/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    var json = await response.json();

    req.session.access_token = json.access_token;

    var userdoc = await oauth.getUser(json.access_token);

    req.session.username = `${userdoc.username}#${userdoc.discriminator}`;
    req.session.id_user = userdoc.id;
    req.session.avatar = userdoc.avatar;

    user.find({ id:  userdoc.id }).exec(function(err, doc) {
      if (doc[0]) {
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
        res.redirect("app");
      } else {

        const doggy = new user({
          id: userdoc.id
        });
        doggy.save()
        req.session.bio = "anonymous user^^";
        req.session.prefix: "/";
        req.session.embedcolor:"654321";
        req.session.embedimage: "https://noziro.now.sh/ressources/noziro_gif.gif";
        req.session.footerimage: "https://noziro.now.sh/ressources/noziro_brown.png";
        req.session.afktransmitchannel: "681305768426995719";
        req.session.afkmode: "false";
        req.session.afkmessage: "Sorry dude, i'm afk";
        req.session.statusmessage: "Noziro Selfbot";
        req.session.activitystatus: "false";
        req.session.statustype: "STREAMING";
        req.session.abstatus: "false";
        req.session.nsstatus: "false";
      res.redirect("app");
      }
    });





  });


};
