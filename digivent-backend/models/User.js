const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "email address is required"],
      match: [/\S+@\S+\.\S+/, "not a valid email address"],
      index: true,
    },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    image: String,
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
