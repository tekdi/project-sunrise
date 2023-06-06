import React from "react";
import { useState, useRef, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import styles from "./QrScanner.module.css";
import { AppBar } from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";

function App() {
  const [data, setData] = useState("");
  const [FrontmediaStream, setFrontmediaStream] = useState(null);

  const navigate = useNavigate();
  const myRegister = () => {
    navigate("/");
  };

  useEffect(() => {
    const persistedData = localStorage.getItem("qrData");
    if (persistedData) {
      setData(persistedData);
    }
  }, []);

  //The first useEffect hook runs only once, on component mount.
  // It retrieves the persisted data from localStorage using the key "qrData"
  //and sets the data state if it exists.

  useEffect(() => {
    localStorage.setItem("qrData", data);
  }, [data]);

  //The second useEffect hook is responsible for updating the persisted data whenever the data state changes.
  // It watches the data dependency and stores the updated value in localStorage with the key "qrData".

  return (
    <React.Fragment>
      <button className={styles.button} onClick={myRegister}>
        Go back
      </button>
      <div className={styles.qrreader}>
        <div className={styles.heading}>Scan QR Code</div>
        <div>Last Scanned : {data}</div>
        <QrReader
          className={styles.scanner}
          constraints={{ facingMode: "environment" }}
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
        <div className={styles.heading2}>
          Hold your device in front of the QR code
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
