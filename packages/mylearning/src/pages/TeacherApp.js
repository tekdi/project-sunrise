import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TeacherApp.module.css";
import { useLayout } from "native-base";

function TeacherApp() {
  const [localqr, setLocalQr] = useState("");
  const [board, setBoard] = useState("");
  const [studentgrade, setStudentGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [displayText, setDisplayText] = useState("");
  const [displayText2, setDisplayText2] = useState(
    "Practice Questions on Air around Us Grade 6 from class 6 science chapter 15"
  );
  const [displayText3, setDisplayText3] = useState(
    "Acute and Chronic Diseases"
  );
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const qrcode = localStorage.getItem("scannedcode");
    const localstorageboard = localStorage.getItem("board");
    const localstoragestudentgrade = localStorage.getItem("studentgrade");
    const localstoragesubject = localStorage.getItem("subject");
    const localstoragedescription = localStorage.getItem("description");

    console.log(qrcode);
    console.log(localstorageboard);
    console.log(localstoragestudentgrade);
    console.log(localstoragesubject);
    console.log(localstoragedescription);
    setLocalQr(qrcode);
    setBoard(localstorageboard);
    setStudentGrade(localstoragestudentgrade);
    setSubject(localstoragesubject);
    setDescription(localstoragedescription);
  }, []);

  // useEffect(() => {
  //   for (var i = localStorage.length - 1; i >= 0; i--) {
  //     var key = localStorage.key(i);

  //     if (key !== "token") {
  //       localStorage.removeItem(key);
  //     }
  //   }

  //   // localStorage.clear();
  // }, []);

  const myclick0 = () => {
    window.open(`https://diksha.gov.in/get/dial/${localqr}`);
  };

  const myclick = () => {
    console.log(displayText);
    localStorage.setItem(
      "displayText",
      `Questions to ask students on ${description} for ${studentgrade} subject ${subject}`
    );
    navigate("/studentapp/chatbot");
  };
  const myclick2 = () => {
    console.log(displayText2);
    localStorage.setItem(
      "displayText",
      `Practice quiz for students on ${description} for ${studentgrade} subject ${subject}`
    );
    navigate("/studentapp/chatbot");
  };
  const myclick3 = () => {
    console.log(displayText3);
    localStorage.setItem(
      "displayText",
      `Class Activity for students on ${description} for ${studentgrade} on subject ${subject}`
    );
    navigate("/studentapp/chatbot");
  };
  const myclick4 = () => {
    window.open("http://139.59.21.40:5001/");
  };

  return (
    <div className={styles.outerdiv}>
      <h2>Teacher App</h2>
      {/* <h3>Dial code : {localqr}</h3> */}
      <div>
        {board}, {studentgrade}, {subject}
      </div>
      <h3 style={{ color: "red" }}>{description}</h3>
      <button className={styles.button} onClick={myclick0}>
        {" "}
        Concept Clarity Videos
      </button>
      <button className={styles.button} onClick={myclick}>
        {" "}
        Questions to Ask
      </button>
      <button className={styles.button} onClick={myclick2}>
        {" "}
        Practice Sheets
      </button>
      <button className={styles.button} onClick={myclick3}>
        {" "}
        Class Activities
      </button>
      <button className={styles.button}> Test your Knowloedge</button>
      <button className={styles.button} onClick={myclick4}>
        {" "}
        AI HelpBot
      </button>
    </div>
  );
}

export default TeacherApp;
