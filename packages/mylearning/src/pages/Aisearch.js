import React from "react";
import styles from "./Aisearch.module.css";
import { useNavigate } from "react-router-dom";
import Layout from "@shiksha/common-lib";
import { AppBar } from "@shiksha/common-lib";
import { Button } from "stories/Button";
import LaunchIcon from "@mui/icons-material/Launch";

function Aisearch() {
  const imagePath = require("../assets/images/pastedimage0.png");
  const imagePath2 = require("../assets/images/pastedimaget.png");
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
      <div className={styles.headingQR}>
        <h2 style={{ color: "white" }}>QR Enabled AI Learning Tool</h2>
      </div>
      <div>
        <h3 className={styles.subheadingQR}>
          This application offers contextualised AI Powered learning tools.
        </h3>
        <h4 className={styles.subheadingQR}>Choose your Persona</h4>
      </div>

      <div className={styles.outerdiv}>
        <img src={imagePath} style={{ marginRight: "20px" }} />
        <button
          onClick={studentqr}
          className={styles.button}
          style={{ marginTop: "37px" }}
        >
          Student
        </button>

        <img
          src={imagePath2}
          style={{ marginRight: "20px", marginTop: "37px" }}
        />

        <button
          onClick={teacherqr}
          className={styles.button}
          style={{ marginTop: "37px" }}
        >
          <span>Teacher</span>
          <LaunchIcon />
        </button>
      </div>

      {/* <div className={styles.outerdiv}>
        <div className={styles.innerdiv}>
          {" "}
        
        </div>
      
       
      </div> */}
    </React.Fragment>
  );
}

export default Aisearch;
