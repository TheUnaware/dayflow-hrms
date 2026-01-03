import { useState } from "react";
import axios from "axios";
import "../../auth.css";

const API = "http://localhost:5000/api/auth";

export default function Login() {
  const [form, setForm] = useState({
    employeeId: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/login`, {
        employeeId: form.employeeId.trim(),
        password: form.password
      });

      alert(
        `Login successful ✅\nWelcome ${res.data.user.name}\nEmployee ID: ${res.data.user.employeeId}`
      );
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">DayFlow</h1>
        <p className="auth-subtitle">Sign in using Employee ID</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="employeeId"
            placeholder="Employee ID (e.g. OIJODO20240001)"
            onChange={handleChange}
            required
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

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <div className="auth-footer">
  Don’t have an account?{" "}
  <a href="/register" className="auth-link">
    Sign Up
  </a>
</div>

      </div>
    </div>
  );
}
