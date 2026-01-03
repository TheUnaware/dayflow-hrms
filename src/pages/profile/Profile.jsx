import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/profileService";
import "../../styles/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getProfile().then(res => setUser(res.data));
  }, []);

  if (!user) return <div>Loading...</div>;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    await updateProfile(user);
    setEditing(false);
    alert("Profile updated");
  };

  return (
    <div className="profile-container">

      {/* NAVBAR GOES HERE */}
      {/* <Navbar /> */}

      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.name.charAt(0)}
          </div>

          <div className="basic-info">
            <h2>{user.name}</h2>
            <p>Login ID: {user.employeeId}</p>
            <p>Email: {user.email}</p>
            <p>Mobile: {user.phone || "—"}</p>
          </div>
        </div>

        <div className="profile-grid">
          <div>
            <label>Company</label>
            <input
              name="company"
              value={user.company || ""}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div>
            <label>Department</label>
            <input
              name="department"
              value={user.department || ""}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div>
            <label>Manager</label>
            <input
              name="manager"
              value={user.manager || ""}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div>
            <label>Location</label>
            <input
              name="location"
              value={user.location || ""}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
        </div>

        <div className="tabs">
          <button>Private Info</button>

          {user.role === "admin" && (
            <button>Salary Info</button>
          )}
        </div>

        <div className="section">
          <h3>About</h3>
          <textarea
            name="about"
            value={user.about || ""}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="section">
          <h3>What I love about my job</h3>
          <textarea
            name="jobLove"
            value={user.jobLove || ""}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="section">
          <h3>Interests & Hobbies</h3>
          <textarea
            name="interests"
            value={user.interests || ""}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="side-box">
          <h3>Skills</h3>
          <textarea
            name="skills"
            value={user.skills?.join(", ") || ""}
            onChange={(e) =>
              setUser({ ...user, skills: e.target.value.split(",") })
            }
            disabled={!editing}
          />
        </div>

        <div className="side-box">
          <h3>Certifications</h3>
          <textarea
            name="certifications"
            value={user.certifications?.join(", ") || ""}
            onChange={(e) =>
              setUser({ ...user, certifications: e.target.value.split(",") })
            }
            disabled={!editing}
          />
        </div>

        <div className="actions">
          {!editing ? (
            <button onClick={() => setEditing(true)}>Edit</button>
          ) : (
            <button onClick={saveProfile}>Save</button>
          )}
        </div>
      </div>
    </div>
  );
}
