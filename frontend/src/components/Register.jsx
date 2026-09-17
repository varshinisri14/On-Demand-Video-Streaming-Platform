import { useState } from "react";

function Register({ setPage }) {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "USER"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        setPage("login");
      } else {
        alert(data.message || "Registration failed");
      }

    } catch (error) {
      alert("Backend server is not running");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          Founder<span>Hub</span>
        </div>

        <h1>Create your account</h1>

        <p className="auth-subtitle">
          Join FounderHub and become part of the startup community.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Account Type</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="USER">User</option>
            <option value="ENTREPRENEUR">Entrepreneur</option>
            <option value="INVESTOR">Investor</option>
          </select>

          <button type="submit" className="auth-submit">
            Create Account
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?

          <button
            type="button"
            className="auth-link-button"
            onClick={() => setPage("login")}
          >
            Sign in
          </button>
        </p>

      </div>
    </div>
  );
}

export default Register;