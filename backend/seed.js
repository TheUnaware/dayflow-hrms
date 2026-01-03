const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Employee = require("./models/Employee");
const Attendance = require("./models/Attendance");
const Leave = require("./models/Leave");
const Payroll = require("./models/Payroll");

mongoose.connect(process.env.MONGO_URI, {
  dbName: "dayflow"
});

const seed = async () => {
  await User.deleteMany();
  await Employee.deleteMany();
  await Attendance.deleteMany();
  await Leave.deleteMany();
  await Payroll.deleteMany();

  const admin = await User.create({
    employeeId: "ADM001",
    name: "Admin",
    email: "admin@dayflow.com",
    password: "hashedpassword", // fine for seeding
    role: "admin"
  });

  const emp = await User.create({
    employeeId: "EMP001",
    name: "John Doe",
    email: "john@dayflow.com",
    password: "hashedpassword",
    role: "employee"
  });

  await Employee.create({
    userId: emp._id,
    phone: "9999999999",
    department: "Engineering",
    designation: "Intern"
  });

  await Attendance.create({
    userId: emp._id,
    date: "2026-01-03",
    checkIn: "10:00 AM",
    checkOut: "6:00 PM"
  });

  await Leave.create({
    userId: emp._id,
    leaveType: "Sick",
    reason: "Fever"
  });

  await Payroll.create({
    userId: emp._id,
    basicSalary: 20000,
    allowances: 2000,
    deductions: 500,
    netSalary: 21500,
    month: "Jan-2026"
  });

  console.log("Database seeded");
  process.exit();
};

seed();
