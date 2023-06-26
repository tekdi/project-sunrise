import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./SchemeBot.module.css";
import { useParams } from "react-router-dom";
const imagePath2 = require("../assets/send.png");

const SchemeBot = () => {
  const { name, selectedOption, ageOption, topicOption } = useParams();
  const [searchText, setSearchText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  //hitesh
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);

  let welcomeMessage = "";
  let age = "";
  let topic = "";

  //hitesh

  useEffect(() => {
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, left: 0 });
  }, [isLoading]);

  useEffect(() => {
    window.scrollTo({ top: 1200, left: 0, behavior: "auto" });
  }, [isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      const maxScrollHeight = textareaRef.current.scrollHeight;
      const visibleHeight = textareaRef.current.clientHeight;
      textareaRef.current.scrollTop = maxScrollHeight - visibleHeight;
    }
  }, [searchText]);

  const handleSearch = async (event) => {
    //hitesh
    if (event.keyCode === 13 || event.type === "click") {
      if (searchText.trim() === "") {
        return; // If the search text is empty or contains only whitespace, do not proceed
      }

      try {
        //hitesh
        setIsLoading(true);
        setSearchText("");
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: searchText, isUser: true },
        ]);
        const response = await axios.get(
          "http://4.240.112.55:8000/query-with-gptindex",
          {
            params: {
              uuid_number: "effc6ca6-1181-11ee-9884-0242ac110002",
              query_string: searchText,
            },
            headers: {
              accept: "application/json",
            },
          }
        );
        const botResponse = response.data.answer;
        console.log(response.data.answer);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, isUser: false },
        ]);
        //hitesh
        setIsLoading(false);
        setShowWelcomeMessage(false); // Hide the welcome message once the user sends a message
      } catch (error) {
        console.error("Error:", error);
      }
      setSearchText("");
    }
  };
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height to match the content
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mobileScreen}>
          <div className={styles.title}>
            <h1 className={styles.heading}>Hi, I am Scholarship Bot.</h1>
          </div>
          {/* <div className={styles.outerWelcome}>
            <div className={styles.welcomeMessage}>Welcome, {name} ! </div>
            <div className={styles.welcomeMessage}>you are {age}</div>{" "}
            {showWelcomeMessage && (
              <div className={styles.welcomePara}>
                <p>{welcomeMessage}</p>
              </div>
            )}{" "}
          </div> */}
          <div
            className={styles.chatContainer}
            id="chatContainer"
            style={{ overflowY: "scroll", marginBottom: "60px" }}
          >
            <div className={styles.messageThread}>
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
                    {/* hitesh */}
                    {message.isUser ? message.text : message.text}
                  </div>
                </div>
              ))}
              {/* hitesh */}
              <div style={{ color: "black", marginLeft: "20px" }}>
                {" "}
                {isLoading ? "loading" : null}
              </div>
            </div>
          </div>{" "}
          {/* inputext  */}
          <div className={styles.chatinput}>
            <div className={styles.bottomContainer}>
              <input
                ref={textareaRef}
                className={styles.bottomInput}
                placeholder="Enter text here"
                value={searchText}
                onChange={handleInputChange}
                rows={1} // Initial rows set to 1
                // hitesh
                onKeyDown={handleSearch}
              />
            </div>
            <div> </div>
            <button
              className={styles.searchButton}
              onClick={(event) => handleSearch(event)}
              disabled={searchText.trim() === ""}
            >
              <img
                src={imagePath2}
                width={20}
                height={20}
                style={{ border: "none" }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SchemeBot;
