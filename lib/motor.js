module.exports = function(app, express, session) {
  app.use(express.static("public"));
  app.use(
    session({
      secret: process.env.secretSession,
      resave: true,
      saveUninitialized: true
    })
  );


  app.use(express.urlencoded());
  app.use(express.json());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


  app.set("view engine", "ejs");
};
