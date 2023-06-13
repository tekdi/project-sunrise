import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StudentApp.module.css";
import { useLayout } from "native-base";

function StudentApp() {
  const [localqr, setLocalQr] = useState("");

  const [displayText, setDisplayText] = useState(
    "Questions on Measuring Line segments for class 6 mathematics"
  );
  const [displayText2, setDisplayText2] = useState(
    "Practice Questions on Air around Us Grade 6 from class 6 science chapter 15"
  );
  const [displayText3, setDisplayText3] = useState(
    "Acute and Chronic Diseases"
  );
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const qrcode = localStorage.getItem("scannedcode");
    console.log(qrcode);
    setLocalQr(qrcode);
  }, []);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const myclick0 = () => {
    navigate("/mylearning");
  };

  const myclick = () => {
    console.log(displayText);
    localStorage.setItem("displayText", displayText);
    navigate("/studentapp/chatbot");
  };
  const myclick2 = () => {
    console.log(displayText2);
    localStorage.setItem("displayText2", displayText2);
    navigate("/studentapp/chatbot");
  };
  const myclick3 = () => {
    console.log(displayText3);
    localStorage.setItem("displayText3", displayText3);
    navigate("/studentapp/chatbot");
  };
  return (
    <div className={styles.outerdiv}>
      <h2>Student App</h2>
      <h3>Dial code : {localqr}</h3>
      <div>NCRT, 6th Grade, Science and Mathematics </div>
      <button className={styles.button} onClick={myclick0}>
        {" "}
        View Videos
      </button>
      <button className={styles.button} onClick={myclick}>
        {" "}
        Revise the topic
      </button>
      <button className={styles.button} onClick={myclick2}>
        {" "}
        Practice Questions
      </button>
      <button className={styles.button} onClick={myclick3}>
        {" "}
        Chapter Vocabulary
      </button>
    </div>
  );
}

export default StudentApp;
