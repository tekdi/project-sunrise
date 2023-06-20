import React, { useState } from "react";
import axios from "axios";
import styles from "./StoryBot.module.css";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { name, selectedOption } = useParams();
  const [searchText, setSearchText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  let welcomeMessage = "";

  if (selectedOption === "en") {
    welcomeMessage =
      "Let’s create a story together. Start by giving the first sentence of the story. For Eg: “There was once a lion called Simba”";
  } else if (selectedOption === "hi") {
    welcomeMessage =
      'आइए मिलकर एक कहानी बनाएं। कहानी का पहला वाक्य देकर प्रारंभ करें। उदाहरण के लिए: "एक बार सिम्बा नाम का एक शेर था"';
  } else if (selectedOption === "gu") {
    welcomeMessage =
      'ચાલો સાથે મળીને એક વાર્તા બનાવીએ. વાર્તાનું પ્રથમ વાક્ય આપીને શરૂઆત કરો. ઉદાહરણ તરીકે: "એક સમયે સિમ્બા નામનો સિંહ હતો"';
  } else if (selectedOption === "ma") {
    welcomeMessage =
      "चला एकत्र एक कथा तयार करूया. कथेचे पहिले वाक्य देऊन सुरुवात करा. उदा: “एकेकाळी सिंबा नावाचा सिंह होता”";
  } else if (selectedOption === "ma") {
    welcomeMessage =
      "चला एकत्र एक कथा तयार करूया. कथेचे पहिले वाक्य देऊन सुरुवात करा. उदा: “एकेकाळी सिंबा नावाचा सिंह होता”";
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
  }

  const handleSearch = async () => {
    if (searchText.trim() === "") {
      return; // If the search text is empty or contains only whitespace, do not proceed
    }

    const payload = {
      input: searchText,
      input_lang: "en",
      output_lang: "en",
    };

    const headers = {
      // Add your desired headers here
      secret: "Jt2YwfZbhYkkta6",
      // 'Authorization': 'Bearer YOUR_AUTH_TOKEN',
    };

    try {
      const response = await axios.post(
        "https://makeastory.uniteframework.io/play_story_game",
        payload,
        { headers: headers }
      );

      const botResponse = response.data.bot_sentence;
      console.log(response.data.bot_sentence);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: searchText, isUser: true },
        { text: botResponse, isUser: false },
      ]);
      setShowWelcomeMessage(false); // Hide the welcome message once the user sends a message
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
      <div className={styles.container}>
        <div className={styles.mobileScreen}>
          <div className={styles.title}>
            <h1 className={styles.heading}>Story Bot</h1>
          </div>
          <div className={styles.welcomeMessage}>Welcome, {name}!</div>
          {showWelcomeMessage && (
            <div className={styles.welcomePara}>
              <p> {welcomeMessage}</p>
            </div>
          )}{" "}
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
