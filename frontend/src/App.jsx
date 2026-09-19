import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function UserDashboard({ setPage }) {
  return (
    <div className="dashboard">

      <nav className="navbar">

        <div className="logo">
          Founder<span>Hub</span>
        </div>

        <button
          className="login-btn"
          onClick={() => setPage("home")}
        >
          Logout
        </button>

      </nav>

      <main className="dashboard-content">

        <p className="section-label">
          USER DASHBOARD
        </p>

        <h1>
          Discover Startup Ideas
        </h1>

        <p>
          Explore entrepreneur stories, startup ideas and inspiring videos.
        </p>

        <div className="dashboard-grid">

          <div className="dashboard-card">

            <div className="icon">
              ▶
            </div>

            <h3>
              Explore Videos
            </h3>

            <p>
              Watch startup stories and discover new ideas from entrepreneurs.
            </p>

            <button className="primary-btn">
              Browse Videos
            </button>

          </div>

          <div className="dashboard-card">

            <div className="icon">
              ★
            </div>

            <h3>
              My Bookmarks
            </h3>

            <p>
              Save interesting startup videos and watch them later.
            </p>

            <button className="secondary-btn">
              View Bookmarks
            </button>

          </div>

          <div className="dashboard-card">

            <div className="icon">
              ◆
            </div>

            <h3>
              My Subscriptions
            </h3>

            <p>
              Manage the entrepreneurs and content you follow.
            </p>

            <button className="secondary-btn">
              View Subscriptions
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}


function EntrepreneurDashboard({ setPage }) {
  return (
    <div className="dashboard">

      <nav className="navbar">

        <div className="logo">
          Founder<span>Hub</span>
        </div>

        <button
          className="login-btn"
          onClick={() => setPage("home")}
        >
          Logout
        </button>

      </nav>

      <main className="dashboard-content">

        <p className="section-label">
          ENTREPRENEUR DASHBOARD
        </p>

        <h1>
          Build Your Startup Story
        </h1>

        <p>
          Share your startup journey, publish videos and connect with
          investors.
        </p>

        <div className="dashboard-grid">

          <div className="dashboard-card">

            <div className="icon">
              +
            </div>

            <h3>
              Upload Video
            </h3>

            <p>
              Share your startup pitch, product demo or founder story.
            </p>

            <button className="primary-btn">
              Add Video
            </button>

          </div>

          <div className="dashboard-card">

            <div className="icon">
              ▶
            </div>

            <h3>
              My Videos
            </h3>

            <p>
              Manage the videos you have published on FounderHub.
            </p>

            <button className="secondary-btn">
              View Videos
            </button>

          </div>

          <div className="dashboard-card">

            <div className="icon">
              ↗
            </div>

            <h3>
              Investor Interest
            </h3>

            <p>
              See investors who are interested in your startup.
            </p>

            <button className="secondary-btn">
              View Investors
            </button>

          </div>

        </div>

        <div className="stats-section">

          <div className="stat-card">

            <h2>
              0
            </h2>

            <p>
              Total Videos
            </p>

          </div>

          <div className="stat-card">

            <h2>
              0
            </h2>

            <p>
              Total Views
            </p>

          </div>

          <div className="stat-card">

            <h2>
              0
            </h2>

            <p>
              Investor Interests
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}


function InvestorDashboard({ setPage }) {

  const [videos, setVideos] = useState([]);
  const [showVideos, setShowVideos] = useState(false);

  const explorePitches = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/videos/approved",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      const data = await response.json();

      if (response.ok) {

        setVideos(data);
        setShowVideos(true);

      } else {

        alert("Unable to load startup pitches.");

      }

    } catch (error) {

      alert("Backend server is not running.");

    }

  };

  const watchPitch = (videoId) => {

    window.open(
      `http://localhost:8080/api/videos/stream/${videoId}`,
      "_blank"
    );

  };

  return (
    <div className="dashboard">

      <nav className="navbar">

        <div className="logo">
          Founder<span>Hub</span>
        </div>

        <button
          className="login-btn"
          onClick={() => setPage("home")}
        >
          Logout
        </button>

      </nav>

      <main className="dashboard-content">

        <p className="section-label">
          INVESTOR DASHBOARD
        </p>

        <h1>
          Discover the Next Big Idea
        </h1>

        <p>
          Watch startup pitches, explore founders and connect with promising
          entrepreneurs.
        </p>

        <div className="dashboard-grid">

          <div className="dashboard-card">

            <div className="icon">
              ▶
            </div>

            <h3>
              Startup Pitches
            </h3>

            <p>
              Watch pitch videos and learn about new startup opportunities.
            </p>

            <button
              className="primary-btn"
              onClick={explorePitches}
            >
              Explore Pitches
            </button>

          </div>

          <div className="dashboard-card">

            <div className="icon">
              ♥
            </div>

            <h3>
              My Interests
            </h3>

            <p>
              View the startup ideas you have shown interest in.
            </p>

            <button className="secondary-btn">
              View Interests
            </button>

          </div>

          <div className="dashboard-card">

            <div className="icon">
              ↗
            </div>

            <h3>
              Connect with Founders
            </h3>

            <p>
              Express your interest and connect with entrepreneurs.
            </p>

            <button className="secondary-btn">
              View Connections
            </button>

          </div>

        </div>


        {showVideos && (

          <div className="video-list">

            <h2>
              Startup Pitches
            </h2>

            {videos.length === 0 ? (

              <div className="dashboard-card">

                <h3>
                  No approved videos available
                </h3>

                <p>
                  There are currently no approved startup pitches to explore.
                </p>

              </div>

            ) : (

              videos.map((video) => (

                <div
                  className="dashboard-card"
                  key={video.videoId}
                >

                  <h3>
                    {video.title}
                  </h3>

                  <p>
                    {video.description}
                  </p>

                  <p>
                    <strong>
                      Category:
                    </strong>{" "}
                    {video.category}
                  </p>

                  <button
                    className="primary-btn"
                    onClick={() => watchPitch(video.videoId)}
                  >
                    ▶ Watch Pitch
                  </button>

                  <button
                    className="primary-btn"
                  >
                    I'm Interested
                  </button>

                </div>

              ))

            )}

          </div>

        )}

      </main>

    </div>
  );
}


function App() {

  const [page, setPage] = useState("home");

  if (page === "login") {
    return <Login setPage={setPage} />;
  }

  if (page === "register") {
    return <Register setPage={setPage} />;
  }

  if (page === "user-dashboard") {
    return <UserDashboard setPage={setPage} />;
  }

  if (page === "entrepreneur-dashboard") {
    return <EntrepreneurDashboard setPage={setPage} />;
  }

  if (page === "investor-dashboard") {
    return <InvestorDashboard setPage={setPage} />;
  }


  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          Founder<span>Hub</span>
        </div>

        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#explore">
            Explore
          </a>

          <a href="#founders">
            Founders
          </a>

          <a href="#investors">
            Investors
          </a>

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

        <section
          className="hero"
          id="home"
        >

          <div className="hero-content">

            <p className="tagline">
              THE PLATFORM FOR THE NEXT BIG IDEA
            </p>

            <h1>

              Discover Ideas.

              <br />

              <span>
                Meet the Founders.
              </span>

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


        <section
          className="features"
          id="explore"
        >

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


        <section
          className="cta"
          id="founders"
        >

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