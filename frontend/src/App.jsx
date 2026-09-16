import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [page, setPage] = useState("home");

  if (page === "login") {
    return <Login setPage={setPage} />;
  }

  if (page === "register") {
    return <Register setPage={setPage} />;
  }

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          Founder<span>Hub</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#explore">Explore</a>
          <a href="#founders">Founders</a>
          <a href="#investors">Investors</a>
        </div>

        <div className="nav-buttons">

          <button
            className="login-btn"
            onClick={() => setPage("login")}
          >
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() => setPage("register")}
          >
            Get Started
          </button>

        </div>

      </nav>

      <main>

        <section className="hero" id="home">

          <div className="hero-content">

            <p className="tagline">
              THE PLATFORM FOR THE NEXT BIG IDEA
            </p>

            <h1>
              Discover Ideas.
              <br />
              <span>Meet the Founders.</span>
            </h1>

            <p className="hero-text">
              Watch startup stories, explore innovative ideas, and discover
              entrepreneurs building the future.
            </p>

            <div className="hero-buttons">

              <button className="primary-btn">
                Explore Videos →
              </button>

              <button
                className="secondary-btn"
                onClick={() => setPage("register")}
              >
                Join FounderHub
              </button>

            </div>

          </div>

          <div className="hero-card">

            <div className="play-button">
              ▶
            </div>

            <p>
              Featured Founder Story
            </p>

            <h3>
              Building the Future
            </h3>

          </div>

        </section>

        <section className="features" id="explore">

          <p className="section-label">
            WHY FOUNDERHUB
          </p>

          <h2>
            Everything around the startup journey.
          </h2>

          <div className="feature-grid">

            <div className="feature-card">

              <div className="icon">
                ▶
              </div>

              <h3>
                Watch & Discover
              </h3>

              <p>
                Explore videos from entrepreneurs and discover new startup
                ideas.
              </p>

            </div>

            <div className="feature-card">

              <div className="icon">
                ◆
              </div>

              <h3>
                Meet Founders
              </h3>

              <p>
                Learn about founders, their journeys, products and business
                ideas.
              </p>

            </div>

            <div className="feature-card">

              <div className="icon">
                ↗
              </div>

              <h3>
                Connect & Invest
              </h3>

              <p>
                Investors can discover promising ideas and express their
                interest.
              </p>

            </div>

          </div>

        </section>

        <section className="cta" id="founders">

          <h2>
            Have an idea worth sharing?
          </h2>

          <p>
            Tell your story. Build your audience. Let the right people
            discover your startup.
          </p>

          <button
            className="primary-btn"
            onClick={() => setPage("register")}
          >
            Become a Founder →
          </button>

        </section>

      </main>

      <footer>

        <div className="logo">
          Founder<span>Hub</span>
        </div>

        <p>
          Discover. Connect. Build.
        </p>

      </footer>

    </div>
  );
}

export default App;