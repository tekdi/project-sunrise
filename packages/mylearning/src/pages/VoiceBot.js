import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import styles from "./VoiceBot.module.css";
import Select from "react-select";

const Microphone = () => {
  const [transcript, setTranscript] = useState(null);
  const [aiStory, setAistory] = useState(null);
  const [recording, setRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const recognitionRef = useRef(null);
  const [finalvoice, setFinalvoice] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false); // New state for tracking audio playing status

  useEffect(() => {
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
  }, []);

  useEffect(() => {
    let timer;
    const handleFinalVoiceChange = () => {
      handleAudioPlay();
    };

    const delay = 3000;

    if (finalvoice !== null) {
      clearTimeout(timer);
      timer = setTimeout(handleFinalVoiceChange, delay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [finalvoice]);

  const options = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    // { value: "mr", label: "Marathi" },
    // { value: "gu", label: "Gujarati" },
    // { value: "kn", label: "Kannada" },
    // { value: "ta", label: "Tamil" },
    // { value: "te", label: "Telugu" },
    // { value: "ml", label: "Malayalam" },
  ];

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption.value);
    console.log("Selected Language:", selectedOption.value);
  };

  const handleClick = () => {
    if (!recording) {
      recognitionRef.current.onresult = async (event) => {
        console.log("event.results");
        console.log(event.results);
        const currentTranscript =
          event.results[event.results.length - 1][0].transcript;
        console.log("Transcript:", currentTranscript);
        await storybot(currentTranscript);
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

      recognitionRef.current.start();
      setRecording(true);
    } else {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };
  const handleAudioPlay = () => {
    console.log("INSIDE BUTTON PLAY");
    if (finalvoice) {
      const audio = new Audio();
      audio.src = `data:audio/wav;base64,${finalvoice}`;
      audio.play();
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
      const { text } = response.data;
      console.log("AI Result:", text);
      // setTranscript(text);
    } catch (error) {
      console.error("AI for Bharat API error:", error);
    }
  };

  const storybot = async (currentTranscript) => {
    try {
      console.log("STORY BOT INPUT");
      console.log(currentTranscript);

      const payload = {
        sentence: currentTranscript,
        secret_key: "Jt2YwfZbhYkkta6",
      };

      const response = await axios.post(
        "https://makeastory.uniteframework.io/play_story_game",
        payload
      );
      const botResponse = response.data.bot_sentence;

      await storyvoice(botResponse);

      setAistory(botResponse);

      console.log("STORY BOT OUTPUT");
      console.log(botResponse);
    } catch (error) {
      console.error("AI for Bharat API error:", error);
    }
  };

  const storyvoice = async (botResponse) => {
    try {
      console.log("STORY VOICE INPUT");
      console.log(botResponse);
      console.log("LANGUAGE");
      console.log(selectedLanguage);

      const payload = {
        controlConfig: { dataTracking: true },
        input: [{ source: botResponse }],
        config: {
          gender: "male",
          language: { sourceLanguage: selectedLanguage },
        },
      };

      const response = await axios.post(
        "https://demo-api.models.ai4bharat.org/inference/tts",
        payload
      );

      const responseArray = response.data.audio;
      const audioData = responseArray[0].audioContent;

      setFinalvoice(audioData);

      console.log("INSIDE VOICE BOT RESPONSE FINAL OUTPUT");
      console.log(audioData);
    } catch (error) {
      console.error("AI for Bharat VOICE API error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <p>Please Select Language</p>
        <Select options={options} onChange={handleLanguageChange} />
        <br />
        <button className={styles.mic} onClick={handleClick}>
          <FaMicrophone
            size={50}
            color={recording ? "red" : "blue"}
            style={{ marginRight: "1px" }}
          />
        </button>
        {recording && <p>Recording in progress...</p>}
        <p>{transcript}</p>
        <p>{aiStory}</p>
        {finalvoice && (
          <div>
            <button style={{ display: "none" }} onClick={handleAudioPlay}>
              {audioPlaying ? "Pause Audio" : "Play Audio"}
            </button>
            <audio src={`data:audio/wav;base64,${finalvoice}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Microphone;
