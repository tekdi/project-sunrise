import React from "react";
import styles from "./Aisearch.module.css";
import { useNavigate } from "react-router-dom";
import Layout from "@shiksha/common-lib";
import { AppBar } from "@shiksha/common-lib";

function Aisearch() {
  const navigate = useNavigate();
  const aiqrsearch = () => {
    navigate("/qrscanner");
  };

  return (
    <React.Fragment>
      <AppBar />
      <div className={styles.outerdiv}>
        {" "}
        <button onClick={aiqrsearch} className={styles.button}>
          Student
        </button>
        <button className={styles.button}>Teacher</button>
      </div>
    </React.Fragment>
  );
}

export default Aisearch;
