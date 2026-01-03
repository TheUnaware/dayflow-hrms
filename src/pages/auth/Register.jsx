import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../auth.css";

const API = "http://localhost:5000/api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [logo, setLogo] = useState(null);
  const [employeeId, setEmployeeId] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${API}/register`, {
        company: form.company,
        name: form.name,
        email: form.email.toLowerCase(),
        phone: form.phone,
        password: form.password
      });

      // 👇 THIS IS THE IMPORTANT PART
      setEmployeeId(res.data.employeeId);

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">DayFlow</h1>
        <p className="auth-subtitle">Create your account</p>

        {employeeId && (
          <div className="success-box">
            <strong>Registration Successful 🎉</strong>
            <p>Your Employee ID:</p>
            <h3>{employeeId}</h3>
            <button onClick={() => navigate("/")}>Go to Login</button>
          </div>
        )}

        {!employeeId && (
          <form onSubmit={handleSubmit} className="auth-form">

            <div className="company-row">
              <input
                name="company"
                placeholder="Company Name"
                onChange={handleChange}
                required
              />

              <label className="logo-btn">
                Upload Logo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setLogo(e.target.files[0])}
                />
              </label>
            </div>

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <div className="password-wrapper">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <span
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="password-wrapper">
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Register
            </button>
          </form>
        )}

        {!employeeId && (
          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/" className="auth-link">Sign In</Link>
          </div>
        )}
      </div>
    </div>
  );
}
