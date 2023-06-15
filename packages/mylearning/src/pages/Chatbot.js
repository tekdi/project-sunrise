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
      setDisplayText(savedText);
      console.log(displayText);
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
      <iframe
        className={styles.iframe}
        src={`https://ncfchat.sunbird.org/ncert/ask?q=${displayText}`}
      ></iframe>
      {/* <button className={styles.backbutton} onClick={back}>
        Back
      </button> */}
    </React.Fragment>
  );
}

export default Chatbot;
