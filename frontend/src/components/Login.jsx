import { useState } from "react";

function Login({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();
       if (response.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.data));

    alert("Login successful!");
}
     else {
        alert(data.message || "Login failed");
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

        <h1>Welcome back</h1>

        <p className="auth-subtitle">
          Sign in to continue your FounderHub journey.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="auth-options">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#forgot">Forgot password?</a>
          </div>

          <button type="submit" className="auth-submit">
            Sign In
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?

          <button
            type="button"
            className="auth-link-button"
            onClick={() => setPage("register")}
          >
            Create one
          </button>

        </p>

      </div>
    </div>
  );
}

export default Login;