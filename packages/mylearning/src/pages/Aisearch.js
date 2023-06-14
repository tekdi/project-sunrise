import React from "react";
import styles from "./Aisearch.module.css";
import { useNavigate } from "react-router-dom";
import Layout from "@shiksha/common-lib";
import { AppBar } from "@shiksha/common-lib";

function Aisearch() {
  const navigate = useNavigate();
  const studentqr = () => {
    navigate("/qrscanner");
  };

  const teacherqr = () => {
    navigate("/teacherqr");
  };

  return (
    <React.Fragment>
      <AppBar />
      <div className={styles.outerdiv}>
        {" "}
        <button onClick={studentqr} className={styles.button}>
          Student
        </button>
        <button onClick={teacherqr} className={styles.button}>
          Teacher
        </button>
      </div>
    </React.Fragment>
  );
}

export default Aisearch;
