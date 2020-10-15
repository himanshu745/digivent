const router = require("express").Router();
const User = require("../models/User.js");
const Question = require("../models/Question.js");

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

// Get booked events details by userId
router.get("/:id/events", (req, res, next) => {
  User.findById(req.user.id)
    .populate({
      path: "events",
      populate: { path: "speaker" },
    })
    .then((user) => {
      return res.send(user);
    })
    .catch(next);
});

// Get questions by user Id
router.get("/:id/questions", (req, res, next) => {
  Question.find({ user: req.params.id })
    .populate("user", "image userName")
    .populate("event", "name")
    .sort({ createdAt: "desc" })
    .then((questions) => {
      console.log("Get questions by eventId");
      return res.status(200).send(questions);
    })
    .catch(next);
});

// Book event
router.put("/:id/event", (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, { $addToSet: { events: req.body } })
    .then((user) => {
      console.log("Add eventId to the user array");
      return res.status(201).send(user);
    })
    .catch(next);
});

// Post new question by userId
router.post("/:id/question", (req, res, next) => {
  const question = new Question(req.body);
  question.user = req.user.id;
  question
    .save()
    .then((question) => {
      if (!req.user.questions) {
        req.user.questions = [];
      }
      req.user.questions.push(question);
      req.user
        .save()
        .then((user) => {
          res.status(201).send({ question: question, user: user });
        })
        .catch(next);
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  if (!req.body.userName) {
    return res.status(422).send("username can't be blank");
  }

  User.findOne({ userName: req.body.userName })
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

  User.findOne({ userName: req.body.userName })
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
