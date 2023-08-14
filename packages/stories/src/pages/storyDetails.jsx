import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import SunbirdVideoPlayer from "./Player";

function StoryDetatils() {
  const location = useLocation();
  const state = location?.state;
  const [showIframe, setShowIframe] = useState(false);
  return (
    <div>
      <div></div>
      <div
        className="product-card"
        style={{ marginTop: "100px", height: "100vh", width: "auto" }}
      >
        <h1>Detailes of story</h1>
        <h3>Actor:{state?.product?.attributes?.Actor}</h3>
        <p>Language: {state?.product?.attributes?.Language}</p>
        <p>Age: {state?.product?.attributes?.Age}</p>
        <p>Theme: {state?.product?.attributes?.Theme}</p>
        <button
          style={{ position: "absolute", justifyContent: "center" }}
          onClick={() => setShowIframe(!showIframe)}
        >
          {showIframe ? "X" : "View"}
        </button>

        {showIframe && (
          <div className="video-player">
            <SunbirdVideoPlayer
              url={state?.product?.attributes?.link}
              width="90vw"
              height="50vh"
            />
          </div>
          // <iframe
          //   width="400vw"
          //   height="450vh"
          //   src="https://www.youtube.com/embed/se9WMfsiIF0"
          //   title="YouTube video player"
          //   frameborder="0"
          //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          //   allowFullScreen
          // ></iframe>
        )}
      </div>
    </div>
  );
}

export default StoryDetatils;
