import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./SchemeLang.module.css";

const SchemeLang = () => {
  const navigate = useNavigate(); // React Router's navigate function for navigation

  const options = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    { value: "gu", label: "Gujarati" },
    { value: "ma", label: "Marathi" },
    { value: "pu", label: "Punjabi" },
    { value: "ta", label: "Tamil" },
    { value: "mal", label: "Malyalam" },
    { value: "Ka", label: "Kannada" },
    { value: "te", label: "Telugu" },
  ];

  const ageOptions = [
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },
    // Add more age options as needed
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleButtonClick = () => {
    // Check if the name is not empty
    if (name.trim() !== "") {
      // Navigate to another page using navigate()
      navigate(`/schemeLang/schemebot/${name}/${selectedOption}/${age}`);
    }
  };

  const isButtonDisabled = name.trim() === "";

  return (
    <div className={styles.container}>
      <div className={styles.mobileScreen}>
        <div className={styles.title}>
          <h1 className={styles.heading}>Scheme Bot</h1>
        </div>
        <div className={styles.content}>
          <p className={styles.para}>
            Welcome to the Story Bot. This bot will co-create stories with you
            in the language of your choice.
          </p>
          <input
            autofocus="autofocus"
            type="text"
            className={styles.textField}
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
          <select
            value={age}
            onChange={handleAgeChange}
            className={styles.dropdown}
          >
            <option value="">Select your Age</option>
            {ageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>{" "}
          <div>
            <select
              value={selectedOption}
              onChange={handleChange}
              className={styles.dropdown}
            >
              <option value="">Select a Language</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div>
              {" "}
              <button
                className={styles.btn}
                onClick={handleButtonClick}
                disabled={isButtonDisabled}
              >
                Start Storytelling!
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SchemeLang;
