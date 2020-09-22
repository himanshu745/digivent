const router = require("express").Router();
const User = require("../models/User.js");
const Event = require("../models/Event.js");

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

router.post("/", (req, res, next) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      return res.status(201).send(result);
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, req.body)
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  User.findByIdAndDelete(req.user.id).then((result) => {
    res.status(200).send(result);
  });
});

router.get("/:id/events", (req, res, next) => {
  Event.find({ user: req.user.id })
    .sort({ createdAt: "desc" })
    .then((events) => {
      return res.status(200).send(events);
    })
    .catch(next);
});

router.post("/:id/events", (req, res, next) => {
  const event = new Event(req.body);
  event.user = req.user.id;
  event
    .save()
    .then((event) => {
      if (!req.user.events) {
        req.user.events = [];
      }
      req.user.event.push(event);
      req.user
        .save()
        .then((user) => {
          res.status(201).send({ event: event, user: user });
        })
        .catch(next);
    })
    .catch(next);
});

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
  if (!req.body.userName) {
    return res.status(422).send("Username can't be blank");
  }
  if (!req.body.password) {
    return res.status(422).send("Password can't be blank");
  }
  if (!req.body.email) {
    return res.status(422).send("Email can't be blank");
  }

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
router.post("/", (req, res, next) => {
  console.log(req.body);
});

module.exports = router;
