const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    speaker: { type: mongoose.Schema.Types.ObjectId, ref: "Speaker" },
    response: { type: String},
    comments: [
      {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      body: String
      }
  ]
},
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
