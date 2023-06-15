import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StudentApp.module.css";
import { useLayout } from "native-base";

function StudentApp() {
  const [localqr, setLocalQr] = useState("");
  const [board, setBoard] = useState("");
  const [studentgrade, setStudentGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [displayText, setDisplayText] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const [displayText3, setDisplayText3] = useState("");
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
      `A brief revision of Chapter ${description} for ${studentgrade} and Subject ${subject}`
    );
    navigate("/studentapp/chatbot");
  };
  const myclick2 = () => {
    console.log(displayText2);
    localStorage.setItem(
      "displayText",
      `Some Practice Questions on Chapter ${description} for ${studentgrade} and Subject ${subject}`
    );
    navigate("/studentapp/chatbot");
  };
  const myclick3 = () => {
    console.log(displayText3);
    localStorage.setItem(
      "displayText",
      `Vocabulary words related to Chapter ${description} for ${studentgrade} Subject ${subject}`
    );
    navigate("/studentapp/chatbot");
  };

  const myclick4 = () => {
    window.open("http://139.59.21.40:5001/");
  };

  return (
    <div className={styles.outerdiv}>
      <h2>Student App</h2>
      {/* <h3>Dial code : {localqr}</h3> */}
      <div>
        {board}, {studentgrade}, {subject}
      </div>
      <h3 style={{ color: "red" }}>{description}</h3>
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
      <button className={styles.button}> Test your Knowloedge</button>
      <button className={styles.button} onClick={myclick4}>
        {" "}
        AI HelpBot
      </button>
    </div>
  );
}

export default StudentApp;
