  
const router = require("express").Router();
const User = require("../models/User.js");
const Event = require("../models/Event.js");

router.param("id", (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        req.user = user;
        return next();
      }
    })
    .catch(next);
});

router.get("/", (req, res, next) => {
  User.find({})
    .sort({ createdAt: "desc" })
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  res.status(200).send(req.user);
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

router.post("/register", function (req, res, next) {
  //server-side validation
 
  
  if (!req.body.username) {
    return res.status(422).send("Username can't be blank");
  }
  if (!req.body.password) {
    return res.status(422).send("Username can't be blank");
  }

  if (!req.body.email) {
    return res.status(422).send("Email can't be blank");
  }

  // find a mathcing user based on username
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
       
        return res.status(422).send("User already exists");
      }
   
      const newUser = new User(req.body);
      newUser
        .save()
        
        .then((result) => {
          return res.send(result);
        })
       
        .catch(next);
    })

  
  // find a mathcing user based on email
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
       
        return res.status(422).send("User already exists");
      }
   
      const newUser = new User(req.body);
      newUser
        .save()
        
        .then((result) => {
          return res.send(result);
        })
       
        .catch(next);
    })
    
    .catch(next);
});

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

module.exports = router;