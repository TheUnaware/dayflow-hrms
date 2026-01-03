const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String, // "YYYY-MM-DD"
    required: true,
  },
  checkIn: String,
  checkOut: String,
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave"],
    default: "Present",
  },
}, { timestamps: true });

AttendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
