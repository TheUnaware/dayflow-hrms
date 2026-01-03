const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["Sick", "Casual", "Paid"],
    required: true,
  },
  fromDate: Date,
  toDate: Date,
  reason: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  adminComment: String,
}, { timestamps: true });

module.exports = mongoose.model("Leave", LeaveSchema);
