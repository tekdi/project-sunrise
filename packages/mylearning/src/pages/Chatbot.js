import React, { useState, useLayoutEffect } from "react";
import styles from "./Chatbot.module.css";
import { useNavigate } from "react-router-dom";
import { AppBar } from "@shiksha/common-lib";

function Chatbot() {
  const [displayText, setDisplayText] = useState("");
  const navigate = useNavigate();

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

  // const back = () => {
  //   navigate("/studentapp");
  // };

  return (
    <React.Fragment>
      <AppBar />
      <h2 className={styles.student}>QR based AI Tool</h2>
      <br></br>
      <div className={styles.text}>Chapter 6</div>
      {/* <div className={styles.text}>{`${displayText}`}</div> */}
      <iframe className={styles.iframe} src={displayText}></iframe>
      {/* <button className={styles.backbutton} onClick={back}>
        Back
      </button> */}
    </React.Fragment>
  );
}

export default Chatbot;
