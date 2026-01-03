const mongoose = require("mongoose");

const PayrollSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  basicSalary: Number,
  allowances: Number,
  deductions: Number,
  netSalary: Number,
  month: String, // "Jan-2026"
}, { timestamps: true });

module.exports = mongoose.model("Payroll", PayrollSchema);
