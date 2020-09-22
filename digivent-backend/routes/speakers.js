const router = require("express").Router();
const Speaker = require("../models/Speaker.js");
const Event = require("../models/Event.js");

router.param("id", (req, res, next, id) => {
  Speaker.findById(id)
    .then((speaker) => {
      if (!speaker) {
        res.status(404).send("speaker not found");
      } else {
        req.speaker = speaker;
        return next();
      }
    })
    .catch(next);
});

router.get("/", (req, res, next) => {
  Speaker.find({})
    .sort({ createdAt: "desc" })
    .then((speakers) => {
      return res.status(200).send(speakers);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  res.status(200).send(req.speaker);
});

router.post("/", (req, res, next) => {
  const speaker = new Speaker(req.body);
  speaker
    .save()
    .then((result) => {
      return res.status(201).send(result);
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  Speaker.findByIdAndUpdate(req.speaker.id, req.body)
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  Speaker.findByIdAndDelete(req.speaker.id).then((result) => {
    res.status(200).send(result);
  });
});



router.get("/:id/events", (req, res, next) => {
  Event.find({ speaker: req.speaker.id })
    .sort({ createdAt: "desc" })
    .then((events) => {
      return res.status(200).send(events);
    })
    .catch(next);
});


router.post("/:id/events", (req, res, next) => {

  const event = new Event(req.body);
  event.speaker = req.speaker.id;
  event
    .save()
    .then((event) => {
      if (!req.speaker.events) {
        req.speaker.events = [];
      }
      req.speaker.events.push(event);
      req.speaker
        .save()
        .then((speaker) => {
          res.status(201).send({ event: event, speaker: speaker });
        })
        .catch(next);
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  if (!req.body.email) {
    return res.status(422).send("Email can't be blank");
  }


  Speaker.findOne({ email: req.body.email })
    .then(function (speaker) {
      if (!speaker) {
        return res.status(422).send("speaker not found");
      }
      return res.send(speaker);
    })
    .catch(next);
});

router.post("/register", function (req, res, next) {
  if (!req.body.firstName) {
    return res.status(422).send("First name can't be blank");
  }
  if (!req.body.lastName) {
    return res.status(422).send("Last name can't be blank");
  }
  if (!req.body.userName) {
    return res.status(422).send("Username can't be blank");
  }
  if (!req.body.email) {
    return res.status(422).send("Email can't be blank");
  }
  if (!req.body.password) {
    return res.status(422).send("Password can't be blank");
  }

  Speaker.findOne({ email: req.body.email })
    .then((speaker) => {
      if (speaker) {
        return res.status(422).send("speaker already exists");
      }
      const newSpeaker = new Speaker(req.body);
      newSpeaker
        .save()
        .then((result) => {
          return res.send(result);
        })
        .catch(next);
    })
    .catch(next);
});
module.exports = router;
