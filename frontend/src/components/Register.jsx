import { useState } from "react";

function Register({ setPage }) {

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    role: "USER"
  });

  const [showRoles, setShowRoles] = useState(false);

  const roles = [
    {
      value: "USER",
      label: "User"
    },
    {
      value: "ENTREPRENEUR",
      label: "Entrepreneur"
    },
    {
      value: "INVESTOR",
      label: "Investor"
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const selectRole = (role) => {
    setFormData({
      ...formData,
      role: role
    });

    setShowRoles(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

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

  const selectedRole = roles.find(
    (role) => role.value === formData.role
  );

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* BACK BUTTON */}

        <button
          type="button"
          className="back-button"
          onClick={() => setPage("home")}
        >
          ← Back
        </button>


        {/* LOGO */}

        <div className="auth-logo">
          Founder<span>Hub</span>
        </div>


        {/* TITLE */}

        <h1>Create your account</h1>

        <p className="auth-subtitle">
          Join FounderHub and become part of the startup community.
        </p>


        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}

          <label>Full Name</label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />


          {/* PHONE NUMBER */}

          <label>Phone Number</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />


          {/* EMAIL */}

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />


          {/* PASSWORD */}

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />


          {/* ACCOUNT TYPE */}

          <label>Account Type</label>

          <div className="custom-select">

            <button
              type="button"
              className="custom-select-button"
              onClick={() => setShowRoles(!showRoles)}
            >

              <span>
                {selectedRole.label}
              </span>

              <span className="select-arrow">
                {showRoles ? "▲" : "▼"}
              </span>

            </button>


            {showRoles && (

              <div className="custom-select-options">

                {roles.map((role) => (

                  <button
                    type="button"
                    key={role.value}
                    className={`custom-option ${
                      formData.role === role.value
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => selectRole(role.value)}
                  >
                    {role.label}
                  </button>

                ))}

              </div>

            )}

          </div>


          {/* CREATE ACCOUNT */}

          <button
            type="submit"
            className="auth-submit"
          >
            Create Account
          </button>

        </form>


        {/* LOGIN LINK */}

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