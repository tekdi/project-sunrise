import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StoryBot.module.css";
import Chatpage from "./ChatPage";
const StoryBot = () => {
  const navigate = useNavigate(); // React Router's navigate function for navigation

  const options = [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
    { value: "matathi", label: "Marathi" },
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleButtonClick = () => {
    // Navigate to another page using navigate()
    navigate(`/storybot/chatpage`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.mobileScreen}>
        <div className={styles.title}>
          <h1 className={styles.heading}>Story Bot</h1>
        </div>
        <div className={styles.content}>
          <p className={styles.para}>
            Welcome to the Story Bot. This bot will co-create stories with you
            in the language of your choice.
          </p>
          <input
            type="text"
            className={styles.textField}
            placeholder="Your Name"
          />{" "}
          <div>
            <select
              value={selectedOption}
              onChange={handleChange}
              className={styles.dropdown}
            >
              <option value="">Select an option</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div>
              <button className={styles.btn} onClick={handleButtonClick}>
                Start Storytelling!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryBot;
