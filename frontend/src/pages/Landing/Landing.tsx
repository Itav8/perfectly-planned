import { useNavigate } from "react-router-dom";
import "./Landing.css";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <video muted autoPlay loop>
        <source
          type="video/mp4"
          src="https://misodope.s3.amazonaws.com/perfectly-planned-bg-vid.mp4"
        />
      </video>
      <div className="landing-content">
        <h1>
          Make all the Celebrations along the way <br />
          <em>Perfectly Planned.</em>{" "}
        </h1>
        <button className="landing-button" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
    </div>
  );
};
