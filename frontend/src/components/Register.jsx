function Register({ setPage }) {
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

        <form>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
          />

          <label>Account Type</label>

          <select>
            <option value="user">User</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="investor">Investor</option>
          </select>

          <button
            type="button"
            className="auth-submit"
          >
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