const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* ===========================
   EMPLOYEE ID GENERATOR
=========================== */
function generateEmployeeId(company, name) {
  const companyCode = company.substring(0, 2).toUpperCase();

  const parts = name.trim().split(" ");
  const first = parts[0]?.substring(0, 2).toUpperCase() || "XX";
  const last = parts[1]?.substring(0, 2).toUpperCase() || "XX";

  const year = new Date().getFullYear();

  const randomSerial = Math.floor(1000 + Math.random() * 9000);

  return `${companyCode}${first}${last}${year}${randomSerial}`;
}

/* ===========================
   REGISTER USER
=========================== */
router.post("/register", async (req, res) => {
  try {
    const { company, name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const employeeId = generateEmployeeId(company, name);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      employeeId,
      company,
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword
    });

    res.json({
      success: true,
      employeeId: user.employeeId
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

/* ===========================
   LOGIN WITH EMPLOYEE ID
=========================== */
router.post("/login", async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    const user = await User.findOne({ employeeId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        employeeId: user.employeeId,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
