const server = require("express").Router();
const { User } = require("../db.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

server.get("/me", async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const result = await User.findByPk(id);
      res.json(result);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

server.post("/login", function (req, res, next) {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, message) {
      if (err) return next(err);
      else if (!user) return res.sendStatus(401);
      else return res.send(jwt.sign(user, SECRET_KEY));
    }
  )(req, res, next);
});

server.get("/facebook", function(req, res, next) {
  passport.authenticate("facebook");
});


server.get("/facebook/callback", function (req, res, next)  {
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/",
  });
});
module.exports = server;

// server.post("/login", (req, res, next) => {
//     passport.authenticate("local", { session: false }, (err, user) => {
//       if (user) {
//         const token = jwt.sign({ user }, "secreto");
//         res.status(200).json({ user, token });
//       } else {
//         res.status(402).send("funca, no funca");
//       }
//     })(req, res, next);
//   });
