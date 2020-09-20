const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const morgan = require("morgan");

const isProduction = false;

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
// mongoose.set("useCreateIndex", true);

mongoose.connection.on("open", function (ref) {
  console.log("MongoDB connected");
  app.listen(3000, () => {
    console.log("Listening on port 3000...");
  });
});

// ROUTING ----------------------------------------------------------------

app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log(`${req.method} request received...`);
  res.send("Hello, welcome to the events api!");
});

const events = require("./routes/events.js");
const users = require("./routes/users.js");
const admins = require("./routes/admins.js");
const questions = require("./routes/questions.js");

app.use("/events", events);
app.use("/users", users);
app.use("/admins", admins);
app.use("/questions", questions);

// ERRORS ----------------------------------------------------------------

app.use((req, res, next) => {
  const error = new Error("Endpoint Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  if (!isProduction) {
    console.log(err.stack);
  }

  res.status(err.status || 500);

  res.json(err);
});
