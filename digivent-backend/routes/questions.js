const router = require("express").Router();

const Question = require("../models/Question.js");
const Event = require("../models/Event.js");

router.get("/", (req, res, next) => {
  Event.find({})
    .sort({ createdAt: "desc" })
    .then((results) => {
      return res.send(results + "questions");
    })
    .catch(next);
});

module.exports = router;
