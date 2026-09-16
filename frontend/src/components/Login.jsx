function Login({ setPage }) {
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

        <form>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
          />

          <div className="auth-options">

            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#forgot">
              Forgot password?
            </a>

          </div>

          <button
            type="button"
            className="auth-submit"
          >
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