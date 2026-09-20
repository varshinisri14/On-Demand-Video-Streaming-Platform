import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";


/* =========================================================
   USER DASHBOARD
========================================================= */

function UserDashboard({ setPage }) {

  const [videos, setVideos] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const [showVideos, setShowVideos] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);


  /* =========================================================
     EXPLORE ENTREPRENEUR VIDEOS
  ========================================================= */

  const exploreVideos = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/videos/available",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      const result = await response.json();

      let data = [];

      if (Array.isArray(result)) {
        data = result;
      } else if (Array.isArray(result.data)) {
        data = result.data;
      }

      if (response.ok) {

        setVideos(data);
        setShowVideos(true);
        setShowSubscriptions(false);

      } else {

        alert(
          result.message ||
          "Unable to load videos."
        );

      }

    } catch (error) {

      alert(
        "Unable to load entrepreneur videos."
      );

    }

  };


  /* =========================================================
     VIEW SUBSCRIPTIONS
  ========================================================= */

  const viewSubscriptions = async () => {

    try {

      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {

        alert("Please login again.");
        return;

      }

      const user = JSON.parse(userData);

      const response = await fetch(
        `http://localhost:8080/api/subscriptions/user/${user.userId}`,
        {
          method: "GET",

          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      const result = await response.json();

      let data = [];

      if (Array.isArray(result)) {
        data = result;
      } else if (Array.isArray(result.data)) {
        data = result.data;
      }

      if (response.ok) {

        setSubscriptions(data);
        setShowSubscriptions(true);
        setShowVideos(false);

      } else {

        alert(
          result.message ||
          "Unable to load subscriptions."
        );

      }

    } catch (error) {

      alert(
        "Unable to load subscriptions."
      );

    }

  };


  /* =========================================================
     SUBSCRIBE
  ========================================================= */

  const subscribeToVideo = async (video) => {

    try {

      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {

        alert("Please login again.");
        return;

      }

      const user = JSON.parse(userData);

      const response = await fetch(
        "http://localhost:8080/api/subscriptions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },

          body: JSON.stringify({

            user: {
              userId: user.userId
            },

            planName: video.title,

            status: "ACTIVE",

            startDate:
              new Date().toISOString(),

            endDate: null

          })
        }
      );

      const result = await response.json();

      if (response.ok) {

        alert(
          "Subscribed successfully!"
        );

        await viewSubscriptions();

      } else {

        alert(
          result.message ||
          "Unable to subscribe."
        );

      }

    } catch (error) {

      alert(
        "Unable to subscribe."
      );

    }

  };


  /* =========================================================
     WATCH VIDEO
  ========================================================= */

  const watchVideo = (videoId) => {

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
          onClick={() => {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setPage("home");

          }}
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
          Explore entrepreneur stories, startup ideas
          and inspiring videos.
        </p>


        <div className="dashboard-grid">


          {/* EXPLORE VIDEOS */}

          <div className="dashboard-card">

            <div className="icon">
              ▶
            </div>

            <h3>
              Explore Videos
            </h3>

            <p>
              Discover entrepreneur stories,
              startup ideas and founder experiences.
            </p>

            <button
              className="primary-btn"
              onClick={exploreVideos}
            >
              Explore Videos →
            </button>

          </div>


          {/* BOOKMARKS */}

          <div className="dashboard-card">

            <div className="icon">
              ★
            </div>

            <h3>
              My Bookmarks
            </h3>

            <p>
              Save interesting startup videos
              and watch them later.
            </p>

            <button className="secondary-btn">
              View Bookmarks
            </button>

          </div>


          {/* SUBSCRIPTIONS */}

          <div className="dashboard-card">

            <div className="icon">
              ◆
            </div>

            <h3>
              My Subscriptions
            </h3>

            <p>
              View and manage your active
              subscriptions.
            </p>

            <button
              className="secondary-btn"
              onClick={viewSubscriptions}
            >
              View Subscriptions
            </button>

          </div>

        </div>


        {/* =================================================
            ENTREPRENEUR VIDEOS
        ================================================= */}

        {showVideos && (

          <div className="video-list">

            <h2>
              Entrepreneur Videos
            </h2>

            {videos.length === 0 ? (

              <div className="dashboard-card">

                <h3>
                  No videos available
                </h3>

                <p>
                  There are currently no entrepreneur
                  videos available.
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


                  <div className="pitch-actions">

                    <button
                      className="primary-btn"
                      onClick={() =>
                        watchVideo(video.videoId)
                      }
                    >
                      ▶ Watch Video
                    </button>


                    <button
                      className="secondary-btn"
                      onClick={() =>
                        subscribeToVideo(video)
                      }
                    >
                      Subscribe
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        )}


        {/* =================================================
            SUBSCRIPTIONS
        ================================================= */}

        {showSubscriptions && (

          <div className="video-list">

            <h2>
              My Subscriptions
            </h2>


            {subscriptions.length === 0 ? (

              <div className="dashboard-card">

                <h3>
                  No subscriptions found
                </h3>

                <p>
                  You have not subscribed to
                  any content yet.
                </p>

              </div>

            ) : (

              subscriptions.map((subscription) => (

                <div
                  className="dashboard-card"
                  key={subscription.subscriptionId}
                >

                  <h3>
                    {subscription.planName}
                  </h3>

                  <p>

                    <strong>
                      Status:
                    </strong>{" "}

                    {subscription.status || "ACTIVE"}

                  </p>

                  <p>

                    <strong>
                      Start Date:
                    </strong>{" "}

                    {subscription.startDate ||
                      "Not available"}

                  </p>

                  <p>

                    <strong>
                      End Date:
                    </strong>{" "}

                    {subscription.endDate ||
                      "Active"}

                  </p>

                </div>

              ))

            )}

          </div>

        )}

      </main>

    </div>

  );

}


/* =========================================================
   UPLOAD VIDEO PAGE
========================================================= */

function UploadVideoPage({ setPage }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [videoUrl, setVideoUrl] = useState("");


  const getEntrepreneurId = async () => {

    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      throw new Error("Please login again.");
    }

    const user = JSON.parse(userData);

    if (!user.userId) {
      throw new Error("User information not found.");
    }

    const response = await fetch(
      "http://localhost:8080/api/entrepreneurs",
      {
        method: "GET",

        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        "Unable to load entrepreneur profile."
      );
    }

    const result = await response.json();

    let profiles = [];

    if (Array.isArray(result)) {
      profiles = result;
    } else if (Array.isArray(result.data)) {
      profiles = result.data;
    }

    const profile = profiles.find((item) => {

      if (
        item.user &&
        item.user.userId === user.userId
      ) {
        return true;
      }

      if (
        item.userId === user.userId
      ) {
        return true;
      }

      return false;

    });

    if (!profile) {
      throw new Error(
        "Entrepreneur profile not found for this account."
      );
    }

    if (!profile.entrepreneurId) {
      throw new Error(
        "Entrepreneur ID not found."
      );
    }

    return profile.entrepreneurId;

  };


  const uploadVideo = async (event) => {

    event.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const entrepreneurId =
        await getEntrepreneurId();

      const response = await fetch(
        "http://localhost:8080/api/videos",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },

          body: JSON.stringify({

            title,
            description,
            category,

            videoPath: videoUrl,

            entrepreneur: {
              entrepreneurId
            }

          })

        }
      );

      const result =
        await response.json();

      if (response.ok) {

        alert(
          "Video uploaded successfully!"
        );

        setTitle("");
        setDescription("");
        setCategory("");
        setVideoUrl("");

        setPage(
          "entrepreneur-dashboard"
        );

      } else {

        alert(
          result.message ||
          "Video upload failed."
        );

      }

    } catch (error) {

      alert(
        error.message ||
        "Unable to upload video."
      );

    }

  };


  return (

    <div className="upload-page">

      <nav className="navbar">

        <div className="logo">
          Founder<span>Hub</span>
        </div>

        <button
          className="login-btn"
          onClick={() =>
            setPage("entrepreneur-dashboard")
          }
        >
          Back to Dashboard
        </button>

      </nav>


      <main className="upload-container">

        <div className="upload-header">

          <p className="section-label">
            ENTREPRENEUR
          </p>

          <h1>
            Upload Startup Video
          </h1>

          <p>
            Share your startup pitch, product demo
            or founder story with the FounderHub community.
          </p>

        </div>


        <div className="upload-card">

          <form onSubmit={uploadVideo}>

            <label>
              Video Title
            </label>

            <input
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              required
            />


            <label>
              Description
            </label>

            <textarea
              placeholder="Describe your startup video"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              required
            />


            <label>
              Category
            </label>

            <input
              type="text"
              placeholder="Example: Technology"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              required
            />


            <label>
              Video URL
            </label>

            <input
              type="text"
              placeholder="Enter video URL"
              value={videoUrl}
              onChange={(event) =>
                setVideoUrl(event.target.value)
              }
              required
            />


            <div className="upload-actions">

              <button
                type="submit"
                className="primary-btn"
              >
                Upload Video
              </button>


              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  setPage("entrepreneur-dashboard")
                }
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>

  );

}


/* =========================================================
   ENTREPRENEUR DASHBOARD
========================================================= */

function EntrepreneurDashboard({ setPage }) {

  const [videos, setVideos] = useState([]);
  const [interests, setInterests] = useState([]);

  const [showVideos, setShowVideos] =
    useState(false);

  const [showInterests, setShowInterests] =
    useState(false);


  const getEntrepreneurId = async () => {

    const token =
      localStorage.getItem("token");

    const userData =
      localStorage.getItem("user");

    if (!token || !userData) {
      throw new Error("Please login again.");
    }

    const user =
      JSON.parse(userData);

    if (!user.userId) {
      throw new Error(
        "User information not found."
      );
    }

    const response = await fetch(
      "http://localhost:8080/api/entrepreneurs",
      {
        method: "GET",

        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        "Unable to load entrepreneur profile."
      );
    }

    const result =
      await response.json();

    let profiles = [];

    if (Array.isArray(result)) {
      profiles = result;
    } else if (Array.isArray(result.data)) {
      profiles = result.data;
    }

    const profile =
      profiles.find((item) => {

        if (
          item.user &&
          item.user.userId === user.userId
        ) {
          return true;
        }

        if (
          item.userId === user.userId
        ) {
          return true;
        }

        return false;

      });

    if (!profile) {
      throw new Error(
        "Entrepreneur profile not found for this account."
      );
    }

    if (!profile.entrepreneurId) {
      throw new Error(
        "Entrepreneur ID not found."
      );
    }

    return profile.entrepreneurId;

  };


  const viewMyVideos = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const entrepreneurId =
        await getEntrepreneurId();

      const response =
        await fetch(
          `http://localhost:8080/api/videos/entrepreneur/${entrepreneurId}`,
          {
            method: "GET",

            headers: {
              Authorization: "Bearer " + token
            }
          }
        );

      const result =
        await response.json();

      let data = [];

      if (Array.isArray(result)) {
        data = result;
      } else if (Array.isArray(result.data)) {
        data = result.data;
      }

      if (response.ok) {

        setVideos(data);
        setShowVideos(true);
        setShowInterests(false);

      } else {

        alert(
          result.message ||
          "Unable to load your videos."
        );

      }

    } catch (error) {

      alert(
        error.message ||
        "Unable to load videos."
      );

    }

  };


  const viewInvestorInterests = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const entrepreneurId =
        await getEntrepreneurId();

      const response =
        await fetch(
          `http://localhost:8080/api/investor-interests/entrepreneur/${entrepreneurId}`,
          {
            method: "GET",

            headers: {
              Authorization: "Bearer " + token
            }
          }
        );

      const result =
        await response.json();

      let data = [];

      if (Array.isArray(result)) {
        data = result;
      } else if (Array.isArray(result.data)) {
        data = result.data;
      }

      if (response.ok) {

        setInterests(data);
        setShowInterests(true);
        setShowVideos(false);

      } else {

        alert(
          result.message ||
          "Unable to load investor interests."
        );

      }

    } catch (error) {

      alert(
        error.message ||
        "Unable to load investor interests."
      );

    }

  };


  return (

    <div className="dashboard">

      <nav className="navbar">

        <div className="logo">
          Founder<span>Hub</span>
        </div>

        <button
          className="login-btn"
          onClick={() => {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setPage("home");

          }}
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
          Share your startup journey, publish videos
          and connect with investors.
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
              Share your startup pitch, product demo
              or founder story.
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                setPage("upload-video")
              }
            >
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
              Manage the videos you have published
              on FounderHub.
            </p>

            <button
              className="secondary-btn"
              onClick={viewMyVideos}
            >
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
              See investors who are interested
              in your startup.
            </p>

            <button
              className="secondary-btn"
              onClick={viewInvestorInterests}
            >
              View Investors
            </button>

          </div>

        </div>


        {showVideos && (

          <div className="video-list">

            <h2>
              My Videos
            </h2>


            {videos.length === 0 ? (

              <div className="dashboard-card">

                <h3>
                  No videos found
                </h3>

                <p>
                  You have not uploaded
                  any videos yet.
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

                  {video.videoPath && (
                    video.videoPath.includes("youtube.com") ||
                    video.videoPath.includes("youtu.be")
                  ) ? (
                    <iframe
                      width="100%"
                      height="315"
                      src={
                        video.videoPath.includes("/embed/")
                          ? video.videoPath
                          : video.videoPath.includes("youtube.com/watch")
                          ? `https://www.youtube.com/embed/${
                              new URL(video.videoPath).searchParams.get("v")
                            }`
                          : video.videoPath.includes("youtu.be")
                          ? `https://www.youtube.com/embed/${
                              new URL(video.videoPath).pathname.substring(1)
                            }`
                          : video.videoPath
                      }
                      title={video.title}
                      style={{
                        marginTop: "20px",
                        borderRadius: "12px",
                        border: "none",
                        display: "block"
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      controls
                      width="100%"
                      style={{
                        marginTop: "20px",
                        borderRadius: "12px",
                        display: "block"
                      }}
                      src={video.videoPath}
                    >
                      Your browser does not support the video player.
                    </video>
                  )}

                </div>

              ))

            )}

          </div>

        )}


        {showInterests && (

          <div className="video-list">

            <h2>
              Investor Interests
            </h2>


            {interests.length === 0 ? (

              <div className="dashboard-card">

                <h3>
                  No investor interests yet
                </h3>

                <p>
                  Investors have not shown interest
                  in your startup yet.
                </p>

              </div>

            ) : (

              interests.map((interest) => (

                <div
                  className="dashboard-card"
                  key={interest.interestId}
                >

                  <h3>
                    Investor Interest
                  </h3>

                  <p>

                    <strong>
                      Investor:
                    </strong>{" "}

                    {
                      interest.investor?.name ||
                      interest.investor?.email ||
                      "Investor"
                    }

                  </p>

                  <p>

                    <strong>
                      Message:
                    </strong>{" "}

                    {
                      interest.message ||
                      "No message provided"
                    }

                  </p>

                  <p>

                    <strong>
                      Status:
                    </strong>{" "}

                    {
                      interest.status ||
                      "PENDING"
                    }

                  </p>

                  <p>

                    <strong>
                      Request Date:
                    </strong>{" "}

                    {
                      interest.requestDate ||
                      "Not available"
                    }

                  </p>

                </div>

              ))

            )}

          </div>

        )}

      </main>

    </div>

  );

}


/* =========================================================
   INVESTOR DASHBOARD
========================================================= */

function InvestorDashboard({ setPage }) {

  const [videos, setVideos] = useState([]);
  const [interests, setInterests] = useState([]);

  const [showVideos, setShowVideos] =
    useState(false);

  const [showInterests, setShowInterests] =
    useState(false);


  const explorePitches = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          "http://localhost:8080/api/videos/available",
          {
            method: "GET",

            headers: {
              Authorization: "Bearer " + token
            }
          }
        );

      const result =
        await response.json();

      let data = [];

      if (Array.isArray(result)) {
        data = result;
      } else if (Array.isArray(result.data)) {
        data = result.data;
      }

      if (response.ok) {

        setVideos(data);
        setShowVideos(true);
        setShowInterests(false);

      } else {

        alert(
          result.message ||
          "Unable to load startup pitches."
        );

      }

    } catch (error) {

      alert(
        "Backend server is not running."
      );

    }

  };


  const watchPitch = (video) => {

    if (!video.videoPath) {
      alert("Unable to load video");
      return;
    }

    if (
      video.videoPath.includes("youtube.com") ||
      video.videoPath.includes("youtu.be")
    ) {

      let youtubeUrl = video.videoPath;

      if (youtubeUrl.includes("youtube.com/watch")) {
        const videoId = new URL(youtubeUrl).searchParams.get("v");
        youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
      }

      if (youtubeUrl.includes("youtu.be")) {
        const videoId = new URL(youtubeUrl).pathname.substring(1);
        youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
      }

      window.open(youtubeUrl, "_blank");

    } else {

      window.open(
        `http://localhost:8080/api/videos/stream/${video.videoId}`,
        "_blank"
      );

    }

  };


  const showInterest = async (video) => {

    try {

      const token =
        localStorage.getItem("token");

      const userData =
        localStorage.getItem("user");

      if (!userData) {

        alert(
          "Please login again."
        );

        return;

      }

      const user =
        JSON.parse(userData);

      const entrepreneurId =
        video.entrepreneur?.entrepreneurId ||
        video.entrepreneurId;

      if (!entrepreneurId) {

        alert(
          "Entrepreneur information is not available."
        );

        return;

      }

      const response =
        await fetch(
          "http://localhost:8080/api/investor-interests",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            },

            body: JSON.stringify({

              investor: {
                userId: user.userId
              },

              entrepreneur: {
                entrepreneurId
              },

              message:
                "I am interested in learning more about this startup.",

              status: "PENDING"

            })

          }
        );

      const result =
        await response.json();

      if (response.ok) {

        alert(
          "Interest sent successfully!"
        );

        await viewInterests();

      } else {

        alert(
          result.message ||
          "Unable to send interest."
        );

      }

    } catch (error) {

      alert(
        "Unable to send interest."
      );

    }

  };


  const subscribeToStartup = async (video) => {

    try {

      const token =
        localStorage.getItem("token");

      const userData =
        localStorage.getItem("user");

      if (!token || !userData) {

        alert(
          "Please login again."
        );

        return;

      }

      const user =
        JSON.parse(userData);

      const response =
        await fetch(
          "http://localhost:8080/api/subscriptions",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            },

            body: JSON.stringify({

              user: {
                userId: user.userId
              },

              planName: video.title,

              status: "ACTIVE",

              startDate:
                new Date().toISOString(),

              endDate: null

            })

          }
        );

      const result =
        await response.json();

      if (response.ok) {

        alert(
          "Subscribed successfully!"
        );

      } else {

        alert(
          result.message ||
          "Unable to subscribe."
        );

      }

    } catch (error) {

      alert(
        "Unable to subscribe."
      );

    }

  };


  const viewInterests = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const userData =
        localStorage.getItem("user");

      if (!userData) {

        alert(
          "Please login again."
        );

        return;

      }

      const user =
        JSON.parse(userData);

      const response =
        await fetch(
          `http://localhost:8080/api/investor-interests/investor/${user.userId}`,
          {
            method: "GET",

            headers: {
              Authorization: "Bearer " + token
            }
          }
        );

      const result =
        await response.json();

      let data = [];

      if (Array.isArray(result)) {
        data = result;
      } else if (Array.isArray(result.data)) {
        data = result.data;
      }

      if (response.ok) {

        setInterests(data);
        setShowInterests(true);
        setShowVideos(false);

      } else {

        alert(
          result.message ||
          "Unable to load interests."
        );

      }

    } catch (error) {

      alert(
        "Unable to load investor interests."
      );

    }

  };


  return (

    <div className="dashboard">

      <nav className="navbar">

        <div className="logo">
          Founder<span>Hub</span>
        </div>

        <button
          className="login-btn"
          onClick={() => {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setPage("home");

          }}
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
          Watch startup pitches, explore founders
          and connect with promising entrepreneurs.
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
              Watch pitch videos and learn about
              new startup opportunities.
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
              View the startup ideas you have
              shown interest in.
            </p>

            <button
              className="secondary-btn"
              onClick={viewInterests}
            >
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
              Express your interest and connect
              with entrepreneurs.
            </p>

            <button
              className="secondary-btn"
              onClick={viewInterests}
            >
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
                  No startup pitches available
                </h3>

                <p>
                  There are currently no startup
                  pitches available.
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


                  <div className="pitch-actions">

                    <button
                      className="primary-btn"
                      onClick={() =>
                        watchPitch(video)
                      }
                    >
                      ▶ Watch Pitch
                    </button>


                    <button
                      className="secondary-btn"
                      onClick={() =>
                        showInterest(video)
                      }
                    >
                      I'm Interested
                    </button>


                    <button
                      className="secondary-btn"
                      onClick={() =>
                        subscribeToStartup(video)
                      }
                    >
                      Subscribe
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        )}


        {showInterests && (

          <div className="video-list">

            <h2>
              My Interests
            </h2>


            {interests.length === 0 ? (

              <div className="dashboard-card">

                <h3>
                  No interests found
                </h3>

                <p>
                  You have not shown interest
                  in any startup yet.
                </p>

              </div>

            ) : (

              interests.map((interest) => (

                <div
                  className="dashboard-card"
                  key={interest.interestId}
                >

                  <h3>
                    {
                      interest.entrepreneur?.startupName ||
                      "Startup"
                    }
                  </h3>

                  <p>
                    {
                      interest.message ||
                      "No message provided."
                    }
                  </p>

                  <p>

                    <strong>
                      Status:
                    </strong>{" "}

                    {
                      interest.status ||
                      "PENDING"
                    }

                  </p>

                  <p>

                    <strong>
                      Requested:
                    </strong>{" "}

                    {
                      interest.requestDate ||
                      "Not available"
                    }

                  </p>

                </div>

              ))

            )}

          </div>

        )}

      </main>

    </div>

  );

}


/* =========================================================
   MAIN APP
========================================================= */

function App() {

  const [page, setPage] =
    useState("home");

  const [featuredVideos, setFeaturedVideos] =
    useState([]);


  /* =========================================================
     LOAD FEATURED VIDEOS
  ========================================================= */

  useEffect(() => {

    fetch(
      "http://localhost:8080/api/videos/available"
    )
      .then((response) => {

        if (!response.ok) {

          throw new Error(
            "Unable to load featured videos."
          );

        }

        return response.json();

      })
      .then((result) => {

        let data = [];

        if (Array.isArray(result)) {

          data = result;

        } else if (Array.isArray(result.data)) {

          data = result.data;

        }

        setFeaturedVideos(
          data.slice(0, 3)
        );

      })
      .catch((error) => {

        console.log(
          "Featured videos could not be loaded:",
          error
        );

      });

  }, []);


  const scrollToSection = (id) => {

    const element =
      document.getElementById(id);

    if (element) {

      element.scrollIntoView({
        behavior: "smooth"
      });

    }

  };


  /* =========================================================
     PAGE ROUTING
  ========================================================= */

  if (page === "login") {

    return (
      <Login
        setPage={setPage}
      />
    );

  }


  if (page === "register") {

    return (
      <Register
        setPage={setPage}
      />
    );

  }


  if (page === "user-dashboard") {

    return (
      <UserDashboard
        setPage={setPage}
      />
    );

  }


  if (page === "entrepreneur-dashboard") {

    return (
      <EntrepreneurDashboard
        setPage={setPage}
      />
    );

  }


  if (page === "upload-video") {

    return (
      <UploadVideoPage
        setPage={setPage}
      />
    );

  }


  if (page === "investor-dashboard") {

    return (
      <InvestorDashboard
        setPage={setPage}
      />
    );

  }


  /* =========================================================
     HOME PAGE
  ========================================================= */

  return (

    <div className="app">


      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="navbar">

        <div
          className="logo"
          onClick={() =>
            scrollToSection("home")
          }
          style={{
            cursor: "pointer"
          }}
        >
          Founder<span>Hub</span>
        </div>


        <div className="nav-links">

          <button
            onClick={() =>
              scrollToSection("home")
            }
          >
            Home
          </button>


          <button
            onClick={() =>
              scrollToSection("explore")
            }
          >
            Explore
          </button>


          <button
            onClick={() =>
              scrollToSection("founders")
            }
          >
            Founders
          </button>


          <button
            onClick={() =>
              scrollToSection("investors")
            }
          >
            Investors
          </button>

        </div>


        <div className="nav-buttons">

          <button
            className="login-btn"
            onClick={() =>
              setPage("login")
            }
          >
            Login
          </button>


          <button
            className="signup-btn"
            onClick={() =>
              setPage("register")
            }
          >
            Get Started
          </button>

        </div>

      </nav>


      <main>


        {/* =================================================
            HERO
        ================================================= */}

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

              Watch startup stories, explore
              innovative ideas, and discover
              entrepreneurs building the future.

            </p>


            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() =>
                  scrollToSection("explore")
                }
              >
                Explore Videos →
              </button>


              <button
                className="secondary-btn"
                onClick={() =>
                  setPage("register")
                }
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


        {/* =================================================
            FEATURED STORIES
        ================================================= */}

        <section
          className="featured-section"
          id="featured"
        >

          <p className="section-label">
            FEATURED STORIES
          </p>


          <h2>
            Discover Startup Stories
          </h2>


          <p className="featured-subtitle">

            Explore real experiences, ideas and journeys
            shared by entrepreneurs.

          </p>


          <div className="featured-grid">

            {featuredVideos.length === 0 ? (

              <div className="featured-empty">

                <h3>
                  No featured stories yet
                </h3>

                <p>
                  Entrepreneur videos
                  will appear here.
                </p>

              </div>

            ) : (

              featuredVideos.map((video) => (

                <div
                  className="featured-card"
                  key={video.videoId}
                >

                  <div className="featured-play">
                    ▶
                  </div>


                  <div className="featured-content">

                    <span>
                      {video.category || "Startup"}
                    </span>


                    <h3>
                      {video.title}
                    </h3>


                    <p>
                      {video.description}
                    </p>


                    <button
                      className="primary-btn"
                      onClick={() =>
                        window.open(
                          `http://localhost:8080/api/videos/stream/${video.videoId}`,
                          "_blank"
                        )
                      }
                    >
                      Watch Story →
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>


        {/* =================================================
            EXPLORE
        ================================================= */}

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
                Explore videos from entrepreneurs
                and discover new startup ideas.
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
                Learn about founders, their journeys,
                products and business ideas.
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
                Investors can discover promising ideas
                and express their interest.
              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            FOUNDERS
        ================================================= */}

        <section
          className="cta"
          id="founders"
        >

          <p className="section-label">
            FOR FOUNDERS
          </p>


          <h2>
            Have an idea worth sharing?
          </h2>


          <p>
            Tell your story. Build your audience.
            Let the right people discover your startup.
          </p>


          <button
            className="primary-btn"
            onClick={() =>
              setPage("register")
            }
          >
            Become a Founder →
          </button>

        </section>


        {/* =================================================
            INVESTORS
        ================================================= */}

        <section
          className="investor-section"
          id="investors"
        >

          <p className="section-label">
            FOR INVESTORS
          </p>


          <h2>
            Discover the next big opportunity.
          </h2>


          <p>
            Explore startup ideas, understand founder
            journeys, and connect with entrepreneurs
            building something meaningful.
          </p>


          <div className="investor-actions">

            <button
              className="primary-btn"
              onClick={() =>
                setPage("login")
              }
            >
              Explore Investment Opportunities →
            </button>

          </div>

        </section>

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

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