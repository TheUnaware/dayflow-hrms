const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
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

    // Profile fields
    company: String,
    department: String,
    manager: String,
    location: String,
    phone: String,
    about: String,
    jobLove: String,
    interests: String,
    skills: [String],
    certifications: [String],

    salary: {
      type: Number,
      select: false, // hidden for non-admin
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
