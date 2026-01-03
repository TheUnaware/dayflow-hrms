const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
  isVerified: {
    type: Boolean,
    default: true, // email verification mocked
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
