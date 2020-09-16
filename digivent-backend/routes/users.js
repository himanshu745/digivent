  
const router = require("express").Router();
const User = require("../models/User.js");
const Event = require("../models/Event.js");

router.get("/", (req, res, next) => {
    Event.find({}) 
    .sort({ createdAt: "desc" })
    .then((results) => {
      return res.send(results + "Users");
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
 console.log(req.body)
 res.send(req.body); 
});

// endpoint for logging in
router.post("/login", (req, res, next) => {
  
  if (!req.body.email) {
    return res.status(422).send("Email can't be blank");
  }


  User.findOne({ email: req.body.email })
    .then(function (user) {
      if (!user) {
        
        return res.status(422).send("User not found");
      }
      return res.send(user);
    })
    .catch(next);
});

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

module.exports = router;