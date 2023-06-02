import React from "react";
import { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import styles from "./QrScanner.module.css";
import { AppBar } from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";

function App() {
  const [data, setData] = useState("");
  const [FrontmediaStream, setFrontmediaStream] = useState(null);

  const navigate = useNavigate();
  const myRegister = () => {
    navigate("/mylearning");
  };

  return (
    <React.Fragment>
      <AppBar />
      <button className={styles.button} onClick={myRegister}>
        Go back
      </button>
      <div className={styles.qrreader}>
        <div className={styles.heading}>QR Code Scanner</div>
        <div>{data}</div>
        <QrReader
          className={styles.scanner}
          scanDelay={500}
          onResult={(result, error) => {
            if (!!result) {
              // location.reload();
              window.open(result, "_blank");
              console.log(result.text);
              setData(result.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
