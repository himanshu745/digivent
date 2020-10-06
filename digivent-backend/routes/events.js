const router = require("express").Router();
const Event = require("../models/Event");
const Speaker = require("../models/Speaker.js");
const Question = require("../models/Question.js");

router.param("id", (req, res, next, id) => {
  Event.findById(id)
    .then((event) => {
      if (!event) {
        res.status(404).send("Event not found");
      } else {
        req.event = event;
        return next();
      }
    })
    .catch(next);
});

// Get events with speaker's name"
router.get("/", (req, res, next) => {
  Event.find({})
    .populate("speaker", "firstName lastName")
    .sort({ createdAt: "desc" })
    .exec()
    .then((results) => {
      console.log("Get event with speaker's name");
      return res.send(results);
    })
    .catch(next);
});

// Get event by Id with speaker's name and image
router.get("/:id", (req, res, next) => {
  Event.findById(req.event.id)
    .populate("speaker", "firstName lastName image")
    .then((event) => {
      return res.send(event);
    })
    .catch(next);
});

// Get speaker's detail by event Id
router.get("/:id/speaker", (req, res, next) => {
  Speaker.find({ _id: req.event.speaker })
    .sort({ createdAt: "desc" })
    .then((speaker) => {
      console.log("Get speaker data by eventId");
      return res.status(200).send(speaker);
    })
    .catch(next);
});

// Get questions by event Id
router.get("/:id/questions", (req, res, next) => {
  Question.find({ event: req.event.id })
    .populate("user", "image userName")
    .populate("event", "name")
    .sort({ createdAt: "desc" })
    .then((questions) => {
      console.log("Get questions by eventId");
      return res.status(200).send(questions);
    })
    .catch(next);
});

// Post new event
router.post("/", (req, res, next) => {
  const event = new Event(req.body);
  event
    .save()
    .then((result) => {
      return res.status(201).send(result);
    })
    .catch(next);
});

// Edit event
router.put("/:id", (req, res, next) => {
  Event.findByIdAndUpdate(req.event.id, req.body)
    .then((event) => {
      res.status(200).send(event);
    })
    .catch(next);
});

// Delete event
router.delete("/:id", (req, res, next) => {
  Event.findByIdAndDelete(req.event.id)
    .then((event) => {
      res.status(204).send(event);
    })
    .catch(next);
});

module.exports = router;
