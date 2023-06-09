// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FaMicrophone } from "react-icons/fa";
// import styles from "./VoiceBot.module.css";
// import Select from "react-select";
// import Aisearch from "./Aisearch";

// const Microphone = () => {
//   const [transcript, setTranscript] = useState(null);
//   const [buttonClass, setButtonClass] = useState(false);
//   const [aiStory, setAistory] = useState(null);
//   const [recording, setRecording] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("");
//   const [selectedAge, setSelectedAge] = useState("");
//   const [selectedTopic, setSelectedTopic] = useState("");
//   const recognitionRef = useRef(null);
//   const [finalvoice, setFinalvoice] = useState(null);
//   const [audioPlaying, setAudioPlaying] = useState(false);
//   const imagePath2 = require("../assets/mic.png");
//   const imagePath3 = require("../assets/play.png");
//   const imagePath4 = require("../assets/pause.png");
//   const imagePath5 = require("../assets/stop.png");
//   const [name, setName] = useState("");
//   const [utterance, setUtterance] = useState(null);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     recognitionRef.current = new window.webkitSpeechRecognition();
//     recognitionRef.current.continuous = true;
//     recognitionRef.current.interimResults = true;

//     recognitionRef.current.onresult = async (event) => {
//       let currentTranscript = "";
//       for (let i = 0; i < event.results.length; i++) {
//         currentTranscript += event.results[i][0].transcript + " ";
//       }
//       currentTranscript = currentTranscript.trim();
//       console.log("Transcript:", currentTranscript);
//       setTranscript(currentTranscript);
//       await storybot(currentTranscript);
//     };

//     recognitionRef.current.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       setRecording(false);
//     };

//     recognitionRef.current.onend = () => {
//       if (recording) {
//         setRecording(false);
//         sendAudioToAIForBharat();
//       }
//     };

//     recognitionRef.current.onaudioend = () => {
//       // Stop recording if there is silence
//       recognitionRef.current.stop();
//       setRecording(false);
//       sendAudioToAIForBharat();
//     };
//   }, []);

//   const handleFinalVoiceChange = () => {
//     handlePlay();
//   };

//   useEffect(() => {
//     let timer;
//     const delay = 4000;

//     if (aiStory !== null) {
//       clearTimeout(timer);
//       timer = setTimeout(handleFinalVoiceChange, delay);
//     }

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [aiStory]);

//   useEffect(() => {
//     const synth = window.speechSynthesis;
//     const u = new SpeechSynthesisUtterance(aiStory);

//     setUtterance(u);

//     return () => {
//       synth.cancel();
//     };
//   }, [aiStory]);

//   const handlePlay = () => {
//     const synth = window.speechSynthesis;

//     if (isPaused) {
//       synth.resume();
//     }

//     synth.speak(utterance);

//     setIsPaused(true);
//   };

//   const handlePause = () => {
//     const synth = window.speechSynthesis;

//     synth.pause();

//     setIsPaused(true);
//   };

//   const handleStop = () => {
//     const synth = window.speechSynthesis;

//     synth.cancel();

//     setIsPaused(false);
//   };

//   const options = [
//     { value: "en", label: "English" },
//     // { value: "hi", label: "Hindi" },
//     // { value: "mr", label: "Marathi" },
//     // { value: "gu", label: "Gujarati" },
//     // { value: "kn", label: "Kannada" },
//     // { value: "ta", label: "Tamil" },
//     // { value: "te", label: "Telugu" },
//     // { value: "ml", label: "Malayalam" },
//   ];

//   const age = [
//     { value: "10", label: "10 years" },
//     { value: "11", label: "11 years" },
//     { value: "12", label: "12 years" },
//   ];

//   const topic = [
//     { value: "Jungle", label: "Jungle" },
//     { value: "School", label: "School" },
//     { value: "Animals", label: "Animals" },
//     { value: "Plants", label: "Plants" },
//     { value: "Earth", label: "Earth" },
//   ];

//   const handleLanguageChange = (selectedOption) => {
//     localStorage.setItem("selectedLanguage", selectedOption.value);
//     console.log("Selected Language:", selectedOption.value);
//   };

//   const handleAgeChange = (selectedOption) => {
//     localStorage.setItem("selectedAge", selectedOption.value);
//     console.log("Selected Age:", selectedOption.value);
//   };

//   const handleTopicChange = (selectedOption) => {
//     localStorage.setItem("selectedTopic", selectedOption.value);
//     console.log("Selected Topic:", selectedOption.value);
//   };

//   const handleClick = () => {
//     if (!recording) {
//       recognitionRef.current.start();
//       setRecording(true);

//       const silenceTimeout = setTimeout(() => {
//         recognitionRef.current.stop();
//         setRecording(false);
//         sendAudioToAIForBharat();
//       }, 2000);

//       recognitionRef.current.onresult = (event) => {
//         // Clear the silence timeout if there is speech detected
//         clearTimeout(silenceTimeout);
//       };
//     } else {
//       recognitionRef.current.stop();
//       setRecording(false);
//     }
//   };

//   const sendAudioToAIForBharat = async () => {
//     try {
//       const audioBlob = new Blob([transcript], { type: "audio/wav" });
//       const formData = new FormData();
//       formData.append("audio", audioBlob);
//       const response = await axios.post(
//         "https://ai-for-bharat-speech-to-text-api",
//         formData
//       );
//       const text = response;
//       console.log("AI Result:");
//       console.log(text);
//       // setTranscript(text);
//     } catch (error) {
//       console.error("AI for Bharat API error:", error);
//     }
//   };

//   const storybot = async (currentTranscript) => {
//     try {
//       console.log("STORY BOT INPUT");
//       console.log(currentTranscript);

//       var language = localStorage.getItem("selectedLanguage");
//       var age = localStorage.getItem("selectedAge");
//       var topic = localStorage.getItem("selectedTopic");

//       const payload = {
//         input: currentTranscript,
//         input_lang: language,
//         output_lang: language,
//         age: age,
//         theme: topic,
//       };

//       const headers = {
//         secret: "Jt2YwfZbhYkkta6",
//       };

//       const response = await axios.post(
//         "https://makeastory.uniteframework.io/play_story_game",
//         payload,
//         { headers: headers }
//       );

//       const botResponse = response.data.bot_sentence;

//       // await storyvoice(botResponse);

//       setAistory(botResponse);

//       console.log("STORY BOT OUTPUT");

//       console.log(botResponse);
//     } catch (error) {
//       console.error("AI for Bharat API error:", error);
//     }
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.center}>
//         <p>Please Select Language</p>
//         <Select options={options} onChange={handleLanguageChange} />
//         <p>Select your Age</p>
//         <Select options={age} onChange={handleAgeChange} />
//         <p>Select a Topic for your Story</p>
//         <Select options={topic} onChange={handleTopicChange} />
//         <br />
//         <div className={styles.secondContainer}>
//           <button
//             className={buttonClass ? styles.ripple : null}
//             onClick={() => {
//               setButtonClass(!buttonClass);
//               handleClick();
//             }}
//           >
//             {" "}
//             <img
//               src={imagePath2}
//               width={30}
//               height={30}
//               style={{ border: "none" }}
//             />
//           </button>
//           {recording && <p>Recording in progress...</p>}
//           <p>{transcript}</p>
//           {/* <p>{aiStory}</p> */}
//           {/* {finalvoice && (
//           <div>
//             <button style={{ display: "none" }} onClick={handleAudioPlay}>
//               {audioPlaying ? "Pause Audio" : "Play Audio"}
//             </button>
//             <audio src={`data:audio/wav;base64,${finalvoice}`} />
//           </div>
//         )} */}
//           <button
//             className={isPaused ? styles.ripple : null}
//             onClick={handlePlay}
//           >
//             {/* {isPaused ? "Resume" : "Play"} */}
//             <img
//               src={imagePath3}
//               width={30}
//               height={30}
//               style={{ border: "none" }}
//             />
//           </button>{" "}
//           <button onClick={handlePause}>
//             {/* Pause */}
//             <img
//               src={imagePath4}
//               width={30}
//               height={30}
//               style={{ border: "none" }}
//             />
//           </button>{" "}
//           <button onClick={handleStop}>
//             {/* Stop */}
//             <img
//               src={imagePath5}
//               width={30}
//               height={30}
//               style={{ border: "none" }}
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Microphone;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaMicrophone } from "react-icons/fa";
import styles from "./VoiceBot.module.css";
import Select from "react-select";
import Aisearch from "./Aisearch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Microphone = () => {
  const [transcript, setTranscript] = useState(null);
  const [buttonClass, setButtonClass] = useState(false);
  const [aiStory, setAistory] = useState(null);
  const [recording, setRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const recognitionRef = useRef(null);
  const [finalvoice, setFinalvoice] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const imagePath2 = require("../assets/mic.png");
  const imagePath3 = require("../assets/play.png");
  const imagePath4 = require("../assets/pause.png");
  const imagePath5 = require("../assets/stop.png");
  const [name, setName] = useState("");
  const [utterance, setUtterance] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

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
      await storybot(currentTranscript);
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

    recognitionRef.current.onaudioend = () => {
      if (recording) {
        setRecording(false);
        sendAudioToAIForBharat();
      }
    };
  }, []);

  const handleFinalVoiceChange = () => {
    handlePlay();
  };

  useEffect(() => {
    let timer;
    const delay = 4000;

    if (aiStory !== null) {
      clearTimeout(timer);
      timer = setTimeout(handleFinalVoiceChange, delay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [aiStory]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(aiStory);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [aiStory]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(true);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  const options = [
    { value: "en", label: "English" },
    // { value: "hi", label: "Hindi" },
    // { value: "mr", label: "Marathi" },
    // { value: "gu", label: "Gujarati" },
    // { value: "kn", label: "Kannada" },
    // { value: "ta", label: "Tamil" },
    // { value: "te", label: "Telugu" },
    // { value: "ml", label: "Malayalam" },
  ];

  const age = [
    { value: "10", label: "10 years" },
    { value: "11", label: "11 years" },
    { value: "12", label: "12 years" },
  ];

  const topic = [
    { value: "Jungle", label: "Jungle" },
    { value: "School", label: "School" },
    { value: "Animals", label: "Animals" },
    { value: "Plants", label: "Plants" },
    { value: "Earth", label: "Earth" },
  ];

  const handleLanguageChange = (selectedOption) => {
    localStorage.setItem("selectedLanguage", selectedOption.value);
    console.log("Selected Language:", selectedOption.value);
  };

  const handleAgeChange = (selectedOption) => {
    localStorage.setItem("selectedAge", selectedOption.value);
    console.log("Selected Age:", selectedOption.value);
  };

  const handleTopicChange = (selectedOption) => {
    localStorage.setItem("selectedTopic", selectedOption.value);
    console.log("Selected Topic:", selectedOption.value);
  };

  const handleClick = () => {
    if (!recording) {
      recognitionRef.current.start();
      setRecording(true);

      const silenceTimeout = setTimeout(() => {
        recognitionRef.current.stop();
        setRecording(false);
        sendAudioToAIForBharat();
      }, 1000); // Adjust the silence timeout value as needed

      recognitionRef.current.onresult = (event) => {
        clearTimeout(silenceTimeout);
        let currentTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + " ";
        }
        currentTranscript = currentTranscript.trim();
        console.log("Transcript:", currentTranscript);
        setTranscript(currentTranscript);
        storybot(currentTranscript);
      };
    } else {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  const sendAudioToAIForBharat = async () => {
    try {
      const audioBlob = new Blob([transcript], { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob);
      const response = await axios.post(
        "https://ai-for-bharat-speech-to-text-api",
        formData
      );
      const text = response;
      console.log("AI Result:");
      console.log(text);
      // setTranscript(text);
    } catch (error) {
      console.error("AI for Bharat API error:", error);
    }
  };

  const storybot = async (currentTranscript) => {
    try {
      console.log("STORY BOT INPUT");
      console.log(currentTranscript);

      var language = localStorage.getItem("selectedLanguage");
      var age = localStorage.getItem("selectedAge");
      var topic = localStorage.getItem("selectedTopic");

      const payload = {
        input: currentTranscript,
        input_lang: language,
        output_lang: language,
        age: age,
        theme: topic,
      };
      const headers = {
        secret: "Jt2YwfZbhYkkta6",
      };

      const response = await axios.post(
        "https://makeastory.uniteframework.io/play_story_game",
        payload,
        { headers: headers }
      );

      const botResponse = response.data.bot_sentence;

      // await storyvoice(botResponse);

      setAistory(botResponse);

      console.log("STORY BOT OUTPUT");

      console.log(botResponse);
    } catch (error) {
      console.error("AI for Bharat API error:", error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2 className={styles.heading} onClick={handleBackButton}>
        {" "}
        <ArrowBackIcon style={{ color: "white" }} /> Voice Bot
      </h2>
      <div className={styles.container}>
        <div className={styles.center}>
          <p>Please Select Language</p>
          <Select options={options} onChange={handleLanguageChange} />
          <p>Select your Age</p>
          <Select options={age} onChange={handleAgeChange} />
          <p>Select a Topic for your Story</p>
          <Select options={topic} onChange={handleTopicChange} />
          <br />
          <div className={styles.secondContainer}>
            <button
              className={buttonClass ? styles.ripple : null}
              onClick={() => {
                setButtonClass(!buttonClass);
                handleClick();
              }}
            >
              {" "}
              <img
                src={imagePath2}
                width={30}
                height={30}
                style={{ border: "none" }}
              />
            </button>
            {recording && <p>Recording in progress...</p>}
            <p>{transcript}</p>
            {/* <p>{aiStory}</p> */}
            {/* {finalvoice && (
          <div>
            <button style={{ display: "none" }} onClick={handleAudioPlay}>
              {audioPlaying ? "Pause Audio" : "Play Audio"}
            </button>
            <audio src={`data:audio/wav;base64,${finalvoice}`} />
          </div>
        )} */}
            <button
              className={isPaused ? styles.ripple : null}
              onClick={handlePlay}
            >
              {/* {isPaused ? "Resume" : "Play"} */}
              <img
                src={imagePath3}
                width={30}
                height={30}
                style={{ border: "none" }}
              />
            </button>{" "}
            <button onClick={handlePause}>
              {/* Pause */}
              <img
                src={imagePath4}
                width={30}
                height={30}
                style={{ border: "none" }}
              />
            </button>{" "}
            <button onClick={handleStop}>
              {/* Stop */}
              <img
                src={imagePath5}
                width={30}
                height={30}
                style={{ border: "none" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Microphone;
