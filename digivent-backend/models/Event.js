const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, required: true },
<<<<<<< HEAD
    speaker:{type: mongoose.Schema.Types.ObjectId, ref: "Admin"},
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"}
=======
    speaker: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
>>>>>>> upstream/master
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
