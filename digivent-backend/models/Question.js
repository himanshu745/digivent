const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
    {
      body: { type: String, required: true },
      guestName: { type: String, required: true },
      event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
      speaker: {type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
    },
    { timestamps: true }
  );


module.exports = mongoose.model("Question", QuestionSchema);