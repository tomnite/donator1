var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Donation = require("../models/donation.js");
var passport = require("passport");
require("../config/passport")(passport);

/* GET ALL DONATIONS */
router.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  var token = getToken(req.headers);
  if (token) {
    Donation.find(function(err, donations) {
      if (err) return next(err);
      res.json(donations);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

/* SAVE Donation */
router.post("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  var token = getToken(req.headers);
  if (token) {
    Donation.create(req.body, function(err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
