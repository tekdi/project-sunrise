import React, { useState } from "react";
import axios from "axios";
import styles from "./StoryBot.module.css";
const ChatPage = () => {
  const [searchText, setSearchText] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSearch = async () => {
    const payload = {
      sentence: searchText,
      secret_key: "Jt2YwfZbhYkkta6",
    };
    try {
      const response = await axios.post(
        "https://makeastory.uniteframework.io/play_story_game",
        payload
      );
      const botResponse = response.data.bot_sentence;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: searchText, isUser: true },
        { text: botResponse, isUser: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
    setSearchText("");
  };
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <>
      {" "}
      <div className={styles.container}>
        <div className={styles.mobileScreen}>
          <div className={styles.title}>
            <h1 className={styles.heading}>Story Bot</h1>
          </div>
          <div className={styles.chatContainer}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.isUser ? styles.userMessage : styles.botMessage
                }`}
              >
                <div
                  className={message.isUser ? styles.userBox : styles.botBox}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>{" "}
          <div className={styles.chatinput}>
            <div className={styles.bottomContainer}>
              <input
                type="text"
                className={styles.bottomInput}
                placeholder="Enter text here"
                value={searchText}
                onChange={handleInputChange}
              />
            </div>
            <button
              className={styles.searchButton}
              onClick={handleSearch}
              disabled={searchText.length === 0}
            >
              Send
            </button>
          </div>{" "}
        </div>
      </div>
    </>
  );
};
export default ChatPage;
