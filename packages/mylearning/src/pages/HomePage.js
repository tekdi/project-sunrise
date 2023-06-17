import React from "react";
import { Layout, Tab, H2, overrideColorTheme } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, Button, VStack } from "native-base";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
import MyCoursesRoute from "../components/MyCoursesRoute";
import MyVideosRoute from "../components/MyVideosRoute";
import styles from "./HomePage.module.css";
const colors = overrideColorTheme(colorTheme);
import { useNavigate } from "react-router-dom";
import IconByName from "@shiksha/common-lib";
import VoiceSearch from "./VoiceSearch";
import VirtualSchool from "./VirtualSchool";
import LaunchIcon from "@mui/icons-material/Launch";

export default function HomePage({ footerLinks, appName, isQRcodebutton }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mainPage = () => {
    navigate("/mylearning");
  };
  const qrscanner = () => {
    navigate("/aisearch");
  };
  const voice = () => {
    navigate("/voicesearch");
  };
  const preference = () => {
    navigate("/mycourses");
  };
  const toc = () => {
    navigate("studentprogram/subjects");
  };
  const jugalbandi = () => {
    window.open("https://doctalk.uniteframework.io/");
  };
  const adaptivelearning = () => {
    window.open("https://alt-shiksha.uniteframework.io/ ");
  };
  const teacherapp = () => {
    window.open("https://sandbox.shiksha.samagra.io/ ");
  };
  const virtualschool = () => {
    navigate("/virtualschool");
  };
  const storybot = () => {
    navigate("/storybot");
  };

  return (
    <Layout
      _header={{
        title: t("PROJECT SUNRISE APPS"),
      }}
    >
      <VStack>
        <div>
          <div className={styles.bdiv}>
            {" "}
            <button onClick={qrscanner} className={styles.button}>
              QR based AI Tool
            </button>
            <button onClick={virtualschool} className={styles.button}>
              Virtual School
            </button>
            <button className={styles.button}>AI Storybot</button>
            <button onClick={jugalbandi} className={styles.button}>
              <span> Textbook Mate</span>
              <LaunchIcon />
            </button>
            <button onClick={voice} className={styles.button}>
              Voice Search
            </button>
            <button className={styles.button} onClick={mainPage}>
              Browse and Search
            </button>{" "}
            <button onClick={preference} className={styles.button}>
              Courses by Preference
            </button>
            <button onClick={teacherapp} className={styles.button}>
              <span> Shiksha Teacher App</span>
              <LaunchIcon />
            </button>
            <button onClick={adaptivelearning} className={styles.button}>
              <span> ALT Adaptive Learning</span>
              <LaunchIcon />
            </button>
            <button onClick={toc} className={styles.button}>
              Course TOC
            </button>
            <button onClick={storybot} className={styles.button}>
              Story Bot
            </button>
          </div>
        </div>
      </VStack>
    </Layout>
  );
}
