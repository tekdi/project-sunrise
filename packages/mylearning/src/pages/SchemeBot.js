import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./SchemeBot.module.css";
import { useParams } from "react-router-dom";
const imagePath2 = require("../assets/send.png");
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const SchemeBot = () => {
  const imagePath3 = require("../assets/mic.png");
  const [buttonClass, setButtonClass] = useState(false);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState(null);
  const recognitionRef = useRef(null);
  const { name, selectedOption, ageOption } = useParams();
  const [searchText, setSearchText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  //hitesh
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  let welcomeMessage = "";
  let age = "";

  //hitesh

  useEffect(() => {
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = async (event) => {
      let currentTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript + " ";
      }
      currentTranscript = currentTranscript.trim();
      console.log("Transcript:", currentTranscript);
      setTranscript(currentTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setRecording(false);
    };

    recognitionRef.current.onend = () => {
      if (recording) {
        setRecording(false);
        sendAudioToAIForBharat();
      }
    };
  }, []);

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

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleClick = () => {
    if (!recording) {
      recognitionRef.current.start();
      setRecording(true);
    } else {
      recognitionRef.current.stop();
      setRecording(false);
      if (transcript) {
        setSearchText(transcript.trim());
        setTranscript(null);
        handleSearch({ type: "click" }); // Trigger handleSearch manually with click event
      }
    }
  };

  if (selectedOption === "en") {
    welcomeMessage = `
      Please allow up to 15 seconds to get response.  
      
      While asking your query, please include information like grade of child, income range etc in your question. For eg : “I am the parent of a child studying in 10th grade. Our annual family income is 3lacs. Please help me with the schemes that apply?”`;
  } else if (selectedOption === "hi") {
    welcomeMessage = `
      कृपया प्रतिक्रिया पाने के लिए 15 सेकंड तक का समय दें।
      
    अपना प्रश्न पूछते समय, कृपया अपने प्रश्न में बच्चे का ग्रेड, आय सीमा आदि जैसी जानकारी शामिल करें। उदाहरण के लिए: “मैं 10वीं कक्षा में पढ़ने वाले एक बच्चे का माता-पिता हूं। हमारी वार्षिक पारिवारिक आय 3 लाख है। कृपया लागू होने वाली योजनाओं में मेरी मदद करें?"`;
  } else if (selectedOption === "gu") {
    welcomeMessage = `
      'પ્રતિસાદ મેળવવા માટે કૃપા કરીને 15 સેકન્ડ સુધીનો સમય આપો.
      
     તમારી ક્વેરી પૂછતી વખતે, કૃપા કરીને તમારા પ્રશ્નમાં બાળકનો ગ્રેડ, આવક શ્રેણી વગેરે જેવી માહિતી શામેલ કરો. દા.ત.: “હું 10મા ધોરણમાં ભણતા બાળકનો માતાપિતા છું. અમારા કુટુંબની વાર્ષિક આવક 3 લાખ છે. કૃપા કરીને મને લાગુ પડતી યોજનાઓમાં મદદ કરો?"`;
  } else if (selectedOption === "ma") {
    welcomeMessage = `
      'कृपया प्रतिसाद मिळविण्यासाठी 15 सेकंदांपर्यंत वेळ द्या.
      
      तुमचा प्रश्न विचारत असताना, कृपया तुमच्या प्रश्नात मुलाचा दर्जा, उत्पन्न श्रेणी इत्यादी माहिती समाविष्ट करा. उदा: “मी 10 व्या वर्गात शिकत असलेल्या मुलाचा पालक आहे. आमचे वार्षिक कौटुंबिक उत्पन्न 3 लाख आहे. कृपया मला लागू होणाऱ्या योजनांसाठी मदत करा?`;
  } else if (selectedOption === "pu") {
    welcomeMessage = `
    ਕਿਰਪਾ ਕਰਕੇ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ 15 ਸਕਿੰਟਾਂ ਤੱਕ ਦਾ ਸਮਾਂ ਦਿਓ।
      
    ਆਪਣੀ ਪੁੱਛਗਿੱਛ ਪੁੱਛਣ ਵੇਲੇ, ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਸਵਾਲ ਵਿੱਚ ਬੱਚੇ ਦਾ ਗ੍ਰੇਡ, ਆਮਦਨੀ ਸੀਮਾ ਆਦਿ ਵਰਗੀ ਜਾਣਕਾਰੀ ਸ਼ਾਮਲ ਕਰੋ। ਉਦਾਹਰਨ ਲਈ: “ਮੈਂ 10ਵੀਂ ਜਮਾਤ ਵਿੱਚ ਪੜ੍ਹ ਰਹੇ ਬੱਚੇ ਦਾ ਮਾਤਾ-ਪਿਤਾ ਹਾਂ। ਸਾਡੀ ਸਾਲਾਨਾ ਪਰਿਵਾਰਕ ਆਮਦਨ 3 ਲੱਖ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਲਾਗੂ ਹੋਣ ਵਾਲੀਆਂ ਸਕੀਮਾਂ ਵਿੱਚ ਮੇਰੀ ਮਦਦ ਕਰੋ?`;
  } else if (selectedOption === "ta") {
    welcomeMessage = `
      'பதிலைப் பெற 15 வினாடிகள் வரை அனுமதிக்கவும்.
      
      உங்கள் கேள்வியைக் கேட்கும் போது, ​​உங்கள் கேள்வியில் குழந்தையின் தரம், வருமான வரம்பு போன்ற தகவல்களைச் சேர்க்கவும். உதாரணமாக: “நான் 10 ஆம் வகுப்பு படிக்கும் ஒரு குழந்தையின் பெற்றோர். எங்கள் குடும்ப ஆண்டு வருமானம் 3 லட்சம். பொருந்தும் திட்டங்களில் எனக்கு உதவவும்?`;
  } else if (selectedOption === "mal") {
    welcomeMessage = `
    പ്രതികരണം ലഭിക്കാൻ ദയവായി 15 സെക്കൻഡ് വരെ അനുവദിക്കുക.
      
    നിങ്ങളുടെ ചോദ്യം ചോദിക്കുമ്പോൾ, കുട്ടിയുടെ ഗ്രേഡ്, വരുമാന പരിധി തുടങ്ങിയ വിവരങ്ങൾ നിങ്ങളുടെ ചോദ്യത്തിൽ ഉൾപ്പെടുത്തുക. ഉദാഹരണത്തിന്: "ഞാൻ പത്താം ക്ലാസ്സിൽ പഠിക്കുന്ന ഒരു കുട്ടിയുടെ രക്ഷിതാവാണ്. ഞങ്ങളുടെ കുടുംബ വാർഷിക വരുമാനം 3 ലക്ഷം. ബാധകമായ സ്കീമുകളിൽ ദയവായി എന്നെ സഹായിക്കണോ?`;
  } else if (selectedOption === "ka") {
    welcomeMessage = `
    ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪಡೆಯಲು ದಯವಿಟ್ಟು 15 ಸೆಕೆಂಡುಗಳವರೆಗೆ ಅನುಮತಿಸಿ.
      
    ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳುವಾಗ, ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯಲ್ಲಿ ಮಗುವಿನ ಗ್ರೇಡ್, ಆದಾಯ ಶ್ರೇಣಿ ಇತ್ಯಾದಿ ಮಾಹಿತಿಯನ್ನು ಸೇರಿಸಿ. ಉದಾ : “ನಾನು 10ನೇ ತರಗತಿಯಲ್ಲಿ ಓದುತ್ತಿರುವ ಮಗುವಿನ ಪೋಷಕರು. ನಮ್ಮ ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ 3 ಲಕ್ಷಗಳು. ದಯವಿಟ್ಟು ಅನ್ವಯವಾಗುವ ಯೋಜನೆಗಳೊಂದಿಗೆ ನನಗೆ ಸಹಾಯ ಮಾಡುವುದೇ?`;
  } else if (selectedOption === "te") {
    welcomeMessage = `
    ప్రతిస్పందన పొందడానికి దయచేసి 15 సెకన్ల వరకు అనుమతించండి.
      
    మీ ప్రశ్నను అడుగుతున్నప్పుడు, దయచేసి మీ ప్రశ్నలో పిల్లల గ్రేడ్, ఆదాయ పరిధి మొదలైన సమాచారాన్ని చేర్చండి. ఉదా: “నేను 10వ తరగతి చదువుతున్న ఒక బిడ్డకు తల్లితండ్రిని. మా కుటుంబ వార్షిక ఆదాయం 3 లక్షలు. దయచేసి వర్తించే పథకాలతో నాకు సహాయం చేయాలా?'`;
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

  const handleSearch = async (event) => {
    //hitesh
    if (event.keyCode === 13 || event.type === "click") {
      let textToSearch = searchText.trim();
      if (transcript) {
        // Use transcript as search text if available
        textToSearch = transcript.trim();
        setTranscript(null); // Reset transcript after using it
      }
      if (textToSearch === "") {
        return;
      }
      try {
        //hitesh
        setIsLoading(true);
        setSearchText("");
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: textToSearch, isUser: true },
        ]);
        let responseData = "";
        if (selectedOption !== "en") {
          console.log("First api call");
          const firstApiResponse = await axios.post(
            "https://demo-api.models.ai4bharat.org/inference/translation/v2",
            {
              controlConfig: { dataTracking: true },
              input: [
                {
                  source: searchText,
                },
              ],
              config: {
                serviceId: "",
                language: {
                  sourceLanguage: selectedOption,
                  targetLanguage: "en",
                  targetScriptCode: null,
                  sourceScriptCode: null,
                },
              },
            }
          );
          responseData = firstApiResponse.data.output[0].target;
        } else {
          responseData = searchText;
        }

        // Second API call to Jugalbandi bot
        console.log("Jugalbandi call");
        const queryString = `You are a helpful assistant who helps with answering questions based on the provided information. If the information asked cannot be found in the text provided, you admit that I can't find the exact information. Always include application links for each scheme. Here is the question: ${responseData}`;
        console.log(queryString);
        const secondApiResponse = await axios.get(
          "http://4.240.112.55:8000/query-with-gptindex",

          {
            params: {
              uuid_number: "6df74548-140e-11ee-9884-0242ac110002",
              query_string: queryString,
            },
            headers: {
              accept: "application/json",
            },
          }
        );
        const secondResponseData = secondApiResponse.data.answer;
        console.log("3rd API call");
        // Third API call for language conversion (if necessary)
        let botResponse = "";
        if (selectedOption !== "en") {
          const thirdApiResponse = await axios.post(
            "https://demo-api.models.ai4bharat.org/inference/translation/v2",
            {
              controlConfig: { dataTracking: true },
              input: [
                {
                  source: secondResponseData,
                },
              ],
              config: {
                serviceId: "",
                language: {
                  sourceLanguage: "en",
                  targetLanguage: selectedOption,
                  targetScriptCode: null,
                  sourceScriptCode: null,
                },
              },
            }
          );
          botResponse = thirdApiResponse.data.output[0].target;
        } else {
          botResponse = secondResponseData;
        }

        const pointsArray = botResponse.split(", " && ": ");
        const formattedResponse = pointsArray
          .map((point) => point.trim())
          .join("<br><br>");

        // The code first splits the botResponse string into an array called pointsArray using the .split(", ") method.
        // This splits the string at each occurrence of ", " and stores the individual points as separate elements in the array.
        // Then, the map() method is used on pointsArray to iterate over each element (point) and
        // apply the trim() method to remove any leading or trailing whitespace.

        //This ensures that each point is properly formatted without any extra spaces.

        // Finally, the join("<br><br>") method is used to join the formatted points from the pointsArray into a single string,
        // where each point is separated by <br><br>.
        // This creates line breaks between each point, visually formatting them as separate paragraphs or sections.

        // The resulting formattedResponse string will contain the formatted points with line breaks between them,
        //suitable for rendering in an HTML environment.

        const cleanedResponse = formattedResponse.replace(/<br><br>$/g, ""); // Remove trailing line breaks

        console.log(cleanedResponse);

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: cleanedResponse, isUser: false },
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
            <button
              style={{ backgroundColor: "transparent", marginTop: "5px" }}
              onClick={handleBackButton}
            >
              <ArrowBackIcon style={{ color: "white" }} />
            </button>
            <h1 className={styles.heading}>Hi, I am ScholarshipKHOJ.</h1>
          </div>
          <div className={styles.outerWelcome}>
            <div className={styles.welcomeMessage}>
              Welcome to the ScholarshipKHOJ, {name} !{" "}
            </div>
            {showWelcomeMessage && (
              <div className={styles.welcomePara}>
                <p>{welcomeMessage}</p>
              </div>
            )}{" "}
          </div>
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
                    <span
                      dangerouslySetInnerHTML={{
                        __html: message.text
                          .replace(
                            /(https:\/\/\S+)/g,
                            "<a href='$1' target='_blank'>$1</a>"
                          )
                          .replace(/\n\n/g, "<br><br>")
                          .replace(/\n/g, "<br>"),
                      }}
                    ></span>
                    {/* hitesh */}
                    {/* {message.isUser ? message.text : message.text} */}
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
            <button
              className={buttonClass ? styles.ripple : null}
              onClick={() => {
                setButtonClass(!buttonClass);
                handleClick();
              }}
            >
              {" "}
              <img
                src={imagePath3}
                width={20}
                height={20}
                style={{ border: "none" }}
              />
              {recording ? "Stop" : "Click"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SchemeBot;
