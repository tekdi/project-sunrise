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
    window.open("http://139.59.21.40:5001/");
  };
  const virtualschool = () => {
    navigate("/virtualschool");
  };

  return (
    <Layout
      _header={{
        title: t("MY_LEARNING"),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <H2 textTransform="inherit">{t("SEARCH ALL TRAINING COURSES")}</H2>
      }
      _subHeader={{ bg: colors.cardBg }}
      _footer={footerLinks}
    >
      <VStack>
        <Box mb="4" roundedBottom={"xl"} shadow={2}>
          <Tab
            _box={{ bg: colors.white, px: "5", pt: "5" }}
            routes={[
              {
                title: t("Select how you want to search your course"),
              },
            ]}
          />
        </Box>

        <div>
          <div className={styles.bdiv}>
            {" "}
            <button className={styles.button} onClick={mainPage}>
              Browse and Search
            </button>{" "}
          </div>
          <div className={styles.bdiv}>
            {" "}
            <button onClick={voice} className={styles.button}>
              Voice Search
            </button>
          </div>
          <div className={styles.bdiv}>
            {" "}
            <button onClick={qrscanner} className={styles.button}>
              QR based AI Tool
            </button>
            <button onClick={preference} className={styles.button}>
              Select Course by Preference
            </button>
            <button onClick={toc} className={styles.button}>
              Course TOC
            </button>
            <button onClick={jugalbandi} className={styles.button}>
              Jugalbandi
            </button>
            <button onClick={virtualschool} className={styles.button}>
              Virtual School
            </button>
          </div>
        </div>
      </VStack>
    </Layout>
  );
}
