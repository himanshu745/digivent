const router = require("express").Router();
const Event = require("../models/Event");
const Speaker = require("../models/Speaker.js");

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

router.get("/", (req, res, next) => {
  Event.find({})
    .sort({ createdAt: "desc" })
    .then((results) => {
      return res.send(results);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  return res.status(200).send(req.event);
});

router.get("/:id/speaker", (req, res, next) => {
  Speaker.find({ _id: req.event.speaker })
    .sort({ createdAt: "desc" })
    .then((speaker) => {
      return res.status(200).send(speaker[0]);
    })
    .catch(next);
});

// Post new event
// router.post("/", (req, res, next) => {
//   const event = new Event(req.body);
//   event
//     .save()
//     .then((result) => {
//       return res.status(201).send(result);
//     })
//     .catch(next);
// });

router.put("/:id", (req, res, next) => {
  Event.findByIdAndUpdate(req.event.id, req.body)
    .then((event) => {
      res.status(200).send(event);
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Event.findByIdAndDelete(req.event.id)
    .then((event) => {
      res.status(204).send(event);
    })
    .catch(next);
});

module.exports = router;
