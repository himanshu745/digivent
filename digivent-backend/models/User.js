const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    question: String,
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "email address is required"],
      match: [/\S+@\S+\.\S+/, "not a valid email address"],
      index: true,
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: String,
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
