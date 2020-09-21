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

// Users' Articles

// this endpoint finds articles as above, but this time using a filter passed into the method. It retreives only those articles where the value of the author property equals the user id passed in through the request
router.get("/:id/events", (req, res, next) => {
  // find all articles with an author value that matches the id of the user that was attached via the preloader
  Event.find({ author: req.speaker.id })
    .sort({ createdAt: "desc" })
    .then((events) => {
      return res.status(200).send(events);
    })
    .catch(next);
});

// this endpoint saves an article to the database, but also attaches the id of the user that the prelaoder attached to the request, and also updates the users article array with the id of the new article
router.post("/:id/events", (req, res, next) => {
  // to save the data in the body a new document is instantiated from the article model to encapsulate the req data
  const event = new Event(req.body);
  // the articles' author property is updated with the id of the user that was preloaded ( this is the user who is uplaoding the article and sent their id in the url of the request )
  event.speaker = req.speaker.id;
  // save the article document to the database
  event
    .save()
    // execute the save and once the response from the database confirms uplaod, update the users array of owned articles
    .then((event) => {
      // if the user has no article array, add one
      if (!req.speaker.events) {
        req.speaker.events = [];
      }
      // push the article document that was created into the attached users' article array ( due to the schema specifying an objectId mongoose will just fish out the id from the document and save that in the array)
      req.speaker.events.push(event);
      // once the user document has been updated, instruct it to save to the database
      req.speaker
        .save()
        .then((speaker) => {
          res.status(201).send({ event: event, speaker: speaker });
        })
        // if saving the user causes an error on the database, it is caught here
        .catch(next);
    })
    //if saving the article to the database causes an error, it is caught here
    .catch(next);
});

// Auth

// endpoint for logging in
router.post("/login", (req, res, next) => {
  // if there is no email in the body, send an error back to the client
  if (!req.body.email) {
    return res.status(422).send("Email can't be blank");
  }

  // find a matching user based on the email address
  Speaker.findOne({ email: req.body.email })
    .then(function (speaker) {
      if (!speaker) {
        // if there is no matching user in the response, send an error tot the client
        return res.status(422).send("speaker not found");
      }
      // otherwise, if there is a match, send that user back. This serves as confirmation that the user is authorised (this is extremely basic and insecure and should never be used in production, it is purely to intriduce the concept of state managament)
      return res.send(speaker);
    })
    .catch(next);
});

router.post("/register", function (req, res, next) {
  //server-side validation
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

  // find a mathcing user based on email
  Speaker.findOne({ email: req.body.email })
    .then((speaker) => {
      if (speaker) {
        // if a user is found that means the email is already taken
        return res.status(422).send("speaker already exists");
      }
      // otherwise if there is no user, uplaod a new user by instantianting the user model to encapsulate the user data in the req
      const newSpeaker = new Speaker(req.body);
      newSpeaker
        .save()
        // execute the save
        .then((result) => {
          return res.send(result);
        })
        // if there was an error trying to save the user handle it here
        .catch(next);
    })
    // if there was an error trying to find the user handle it here
    .catch(next);
});
module.exports = router;
