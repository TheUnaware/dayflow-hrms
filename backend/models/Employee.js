const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone: String,
  address: String,
  department: String,
  designation: String,
  joiningDate: Date,
  profileImage: String, // URL only
  documents: [String], // file links (dummy allowed)
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeSchema);
