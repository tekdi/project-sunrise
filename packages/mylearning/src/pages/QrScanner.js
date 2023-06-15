import React from "react";
import { useState, useRef, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import styles from "./QrScanner.module.css";
import { AppBar } from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [FrontmediaStream, setFrontmediaStream] = useState(null);

  const navigate = useNavigate();
  const myRegister = () => {
    navigate("/aisearch");
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

  const dialcodeFunction = async (lastSlug) => {
    try {
      console.log(lastSlug);
      const response = await axios.post(
        "https://diksha.gov.in/api/content/v1/search",
        {
          request: {
            filters: {
              visibility: ["Default", "Parent"],
              dialcodes: lastSlug,
            },
            mode: "collection",
          },
        }
      );

      console.log(response.data.result.collections[0]);
      console.log(response.data.result.collections[0].board);
      console.log(response.data.result.collections[0].gradeLevel[0]);
      console.log(response.data.result.collections[0].subject[0]);
      console.log(response.data.result.content[0]);
      console.log(response.data.result.content[0].description);
      localStorage.setItem("dialcode", lastSlug);
      localStorage.setItem("board", response.data.result.collections[0].board);
      localStorage.setItem(
        "studentgrade",
        response.data.result.collections[0].gradeLevel[0]
      );
      localStorage.setItem(
        "subject",
        response.data.result.collections[0].subject[0]
      );
      localStorage.setItem(
        "description",
        response.data.result.content[0].description
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
          scanDelay={1000}
          onResult={(result, error) => {
            if (!!result) {
              // location.reload();
              // window.open(result, "_blank");

              console.log(result.text);
              const link = result.text;

              const url = link;
              const params = new URLSearchParams(new URL(url).search);

              const lastSlug = params.get("id");

              console.log(lastSlug);

              setData(result.text);
              localStorage.setItem("scannedcode", lastSlug);
              dialcodeFunction(lastSlug);
              // window.open("http://localhost:3010/studentapp", "_blank");
              setTimeout(function () {
                window.open("http://localhost:3010/studentapp", "_self");
              }, 1000);

              // setTimeout(function () {
              //   window.open(
              //     "https://shikshademo.uniteframework.io/studentapp",
              //     "_self"
              //   );
              // }, 1000);
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
