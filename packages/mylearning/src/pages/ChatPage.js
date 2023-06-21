import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./StoryBot.module.css";
import { useParams } from "react-router-dom";

const ChatPage = () => {
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
  }, [searchText]); //condition for languages
  if (selectedOption === "en") {
    welcomeMessage =
      'Lets create a story together. Start by giving the first sentence of the story. For Eg: "There was once a lion called Simba"';
  } else if (selectedOption === "hi") {
    welcomeMessage =
      'आइए मिलकर एक कहानी बनाएं। कहानी का पहला वाक्य देकर प्रारंभ करें। उदाहरण के लिए: "एक बार सिम्बा नाम का एक शेर था"';
  } else if (selectedOption === "gu") {
    welcomeMessage =
      'ચાલો સાથે મળીને એક વાર્તા બનાવીએ. વાર્તાનું પ્રથમ વાક્ય આપીને શરૂઆત કરો. ઉદાહરણ તરીકે: "એક સમયે સિમ્બા નામનો સિંહ હતો"';
  } else if (selectedOption === "ma") {
    welcomeMessage =
      'चला एकत्र एक कथा तयार करूया. कथेचे पहिले वाक्य देऊन सुरुवात करा. उदा: "एकेकाळी सिंबा नावाचा सिंह होता"';
  } else if (selectedOption === "ma") {
    welcomeMessage =
      'चला एकत्र एक कथा तयार करूया. कथेचे पहिले वाक्य देऊन सुरुवात करा. उदा: "एकेकाळी सिंबा नावाचा सिंह होता"';
  } else if (selectedOption === "pu") {
    welcomeMessage =
      'ਆਓ ਮਿਲ ਕੇ ਇੱਕ ਕਹਾਣੀ ਬਣਾਈਏ। ਕਹਾਣੀ ਦਾ ਪਹਿਲਾ ਵਾਕ ਦੇ ਕੇ ਸ਼ੁਰੂ ਕਰੋ। ਉਦਾਹਰਨ: "ਇੱਕ ਵਾਰ ਸਿੰਬਾ ਨਾਮ ਦਾ ਇੱਕ ਸ਼ੇਰ ਸੀ"';
  } else if (selectedOption === "ta") {
    welcomeMessage =
      'ஒன்றாக ஒரு கதையை உருவாக்குவோம். கதையின் முதல் வாக்கியத்தைக் கொடுத்து ஆரம்பிக்கவும். உதாரணம்: "ஒரு காலத்தில் சிம்பா என்ற சிங்கம் இருந்தது."';
  } else if (selectedOption === "mal") {
    welcomeMessage =
      'നമുക്ക് ഒരുമിച്ച് ഒരു കഥ സൃഷ്ടിക്കാം. കഥയുടെ ആദ്യ വാചകം പറഞ്ഞുകൊണ്ട് ആരംഭിക്കുക. ഉദാഹരണം: "ഒരിക്കൽ സിംബ എന്നൊരു സിംഹമുണ്ടായിരുന്നു."';
  } else if (selectedOption === "ka") {
    welcomeMessage =
      'ಒಟ್ಟಿಗೆ ಕಥೆಯನ್ನು ರಚಿಸೋಣ. ಕಥೆಯ ಮೊದಲ ವಾಕ್ಯವನ್ನು ಹೇಳುವ ಮೂಲಕ ಪ್ರಾರಂಭಿಸಿ. ಉದಾಹರಣೆ: "ಒಂದು ಕಾಲದಲ್ಲಿ ಸಿಂಬಾ ಎಂಬ ಸಿಂಹ ಇತ್ತು."';
  } else if (selectedOption === "te") {
    welcomeMessage =
      'ఇద్దరం కలిసి కథను రూపొందిద్దాం. కథలోని మొదటి వాక్యాన్ని చెప్పడం ద్వారా ప్రారంభించండి. ఉదాహరణ: "ఒకప్పుడు సింబా అనే సింహం ఉండేది."';
  } else {
    welcomeMessage = "Welcome";
  } // condition for age
  if (ageOption === "18") {
    age = "18";
  } else if (ageOption === "19") {
    age = "19";
  } else if (ageOption === "20") {
    age = "20";
  } else {
    age = "age";
  } // condition for topic
  if (topicOption === "adventure") {
    topic = "adventure";
  } else if (topicOption === "jungle") {
    topic = "jungle";
  } else if (topicOption === "animal") {
    topic = "animal";
  } else {
    topic = "topic";
  }
  const handleSearch = async (event) => {
    //hitesh
    if (event.keyCode === 13 || event.type === "click") {
      if (searchText.trim() === "") {
        return; // If the search text is empty or contains only whitespace, do not proceed
      }
      const payload = {
        input: searchText,
        input_lang: "en",
        output_lang: "en",
        age: age,
        theme: topic,
      };
      const headers = {
        // Add your desired headers here
        secret: "Jt2YwfZbhYkkta6",
        // 'Authorization': 'Bearer YOUR_AUTH_TOKEN',
      };
      try {
        //hitesh
        setIsLoading(true);
        setSearchText("");
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: searchText, isUser: true },
        ]);
        const response = await axios.post(
          "https://makeastory.uniteframework.io/play_story_game",
          payload,
          { headers: headers }
        );
        const botResponse = response.data.bot_sentence;
        console.log(response.data.bot_sentence);
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
            <h1 className={styles.heading}>Story Bot</h1>
          </div>
          <div className={styles.outerWelcome}>
            <div className={styles.welcomeMessage}>Welcome, {name} ! </div>
            <div className={styles.welcomeMessage}>you are {age}</div>{" "}
            {showWelcomeMessage && (
              <div className={styles.welcomePara}>
                <p>{welcomeMessage}</p>
              </div>
            )}{" "}
          </div>
          <div className={styles.chatContainer}>
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
              <div style={{ color: "whitesmoke", marginLeft: "20px" }}>
                {" "}
                {isLoading ? "loading" : null}
              </div>
            </div>
          </div>{" "}
          {/* inputext  */}
          <div className={styles.chatinput}>
            <div className={styles.bottomContainer}>
              <textarea
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
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatPage;
