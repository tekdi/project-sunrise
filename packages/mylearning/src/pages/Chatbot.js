import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";
import { useNavigate } from "react-router-dom";
import { AppBar } from "@shiksha/common-lib";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Chatbot() {
  const [displayText, setDisplayText] = useState("");
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  // const handleButtonClick = () => {
  //   if (iframeRef.current) {
  //     const iframeContent =
  //       iframeRef.current.contentWindow.document.body.innerHTML;
  //     console.log(iframeContent);
  //   }
  // };

  useLayoutEffect(() => {
    const savedText = localStorage.getItem("displayText");

    if (savedText !== null) {
      // const updatedText = savedText.replace(/\s/g, "%20").toLowerCase();

      let uri = `https://ncfchat.sunbird.org/ncert/ask?q=${savedText}`;
      let encoded = uri.replace(/\s/g, "%20").replace(/-/g, "");

      setDisplayText(encoded);
      console.log(encoded);
    }
  }, []);

  const handleBackButton = () => {
    navigate(-1);
  };

  // const back = () => {
  //   navigate("/studentapp");
  // };

  return (
    <React.Fragment>
      <AppBar />
      <div>
        <h2 className={styles.student} onClick={handleBackButton}>
          {" "}
          <ArrowBackIcon style={{ color: "gray" }} /> QR based AI Tool
        </h2>
      </div>
      <br></br>
      <div className={styles.text}>Chapter 6</div>
      {/* <div className={styles.text}>{`${displayText}`}</div> */}

      <iframe
        ref={iframeRef}
        className={styles.iframe}
        src={displayText}
      ></iframe>
      {/* <button onClick={handleButtonClick}>Get iframe body</button> */}
      {/* <button className={styles.backbutton} onClick={back}>
        Back
      </button> */}
    </React.Fragment>
  );
}

export default Chatbot;
