module.exports = function(app, mongoose, fetch, url, oauth) {


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


  app.get("/app", (req, res) => {
    if (!req.session.username) return res.redirect("./");
    res.render("app", {
      username: req.session.username,
      avatar: req.session.avatar,
      userid: req.session.id_user,
    });
  });

  app.get("/door", (req, res) => {
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

    var user = await oauth.getUser(json.access_token);

    req.session.username = `${user.username}#${user.discriminator}`;
    req.session.id_user = user.id;
    req.session.avatar = user.avatar;


    res.redirect("app");
  });


};
