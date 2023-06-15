import React, { useState, useEffect } from "react";
import styles from "./VirtualSchool.module.css";
import videolist from "./VideoList";

import { useParams, useNavigate } from "react-router-dom";

const VirtualSchool = () => {
  const [selectedGrade, setSelectedGrade] = useState(""); // State to hold the selected grade
  const { gradeNumber } = useParams(); // Access the grade from URL parameters
  const [currentDate, setCurrentDate] = useState("");
  const [showButtons, setShowButtons] = useState(false); // State to control button visibility
  const navigate = useNavigate(); // Navigation function

  useEffect(() => {
    setSelectedGrade(`Grade ${gradeNumber}`); // Get the current date and month
    const date = new Date();
    const options = { day: "numeric", month: "long" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
  }, [gradeNumber]);

  const handleChange = (event) => {
    setSelectedGrade(event.target.value); // Update the selected grade when the dropdown value changes
    setShowButtons(event.target.value !== ""); // Show buttons only if a grade is selected
  };

  const handleButtonClick = () => {
    // Navigate to the new component or page
    navigate(`/virtualschool/gradeNumber/videolist`);
  };

  return (
    <>
      <div className={styles.bdiv}>
        <div>
          <div className={styles.heading}>Virtual Kenyan School</div>
        </div>
        <select
          value={selectedGrade}
          onChange={handleChange}
          className={styles.dropdown}
        >
          <option value="">Select Grade</option>
          <option value="1">Grade 1</option>
          <option value="2">Grade 2</option>
          <option value="3">Grade 3</option>
          <option value="4">Grade 4</option>
          <option value="5">Grade 5</option>
          <option value="6">Grade 6</option>
          <option value="7">Grade 7</option>
          <option value="8">Grade 8</option>
          <option value="9">Grade 9</option>
          <option value="10">Grade 10</option>
        </select>{" "}
        {showButtons && (
          <div className={styles.bdiv}>
            <h1>
              Grade-{selectedGrade}, {currentDate}
            </h1>
            <div className={styles.bdiv}>
              <button
                className={styles.button}
                onClick={() => handleButtonClick("Maths")}
              >
                8:00 AM Maths
              </button>
            </div>
            <div className={styles.bdiv}>
              <button
                className={styles.button}
                onClick={() => handleButtonClick("Science")}
              >
                9:00 AM Science
              </button>
            </div>
            <div className={styles.bdiv}>
              <button
                className={styles.button}
                onClick={() => handleButtonClick("English")}
              >
                10:00 AM English
              </button>
            </div>
            <div className={styles.bdiv}>
              <button
                className={styles.button}
                onClick={() => handleButtonClick("Geography")}
              >
                11:00 AM Geography
              </button>
            </div>
            <div className={styles.bdiv}>
              <button
                className={styles.button}
                onClick={() => handleButtonClick("History")}
              >
                12:00 PM History
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default VirtualSchool;
