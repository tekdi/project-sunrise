import { Layout } from "@shiksha/common-lib";
import { Link } from "react-router-dom";
import { Box, HStack, Text, VStack } from "native-base";
import "./Sample.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./Card";
import { useState, useEffect } from "react";
import imagePath from "../assets/TSHeader.png";

export default function Sample() {
  const [story, setStory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [language, setLanguage] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  const [actor, setActor] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: "https://onest-strapi.tekdinext.com/api/stories",
      responseType: "stream",
    })
      .then(function (response) {
        const parsedData = response.data.data;
        setStory(parsedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredStory = story.filter((item) => {
    const categoryFilter =
      selectedCategory === "all" ||
      item?.attributes?.Theme === selectedCategory;
    const languageFilter =
      language === "all" || item?.attributes?.Language === language;
    const ageGroupFilter =
      ageGroup === "all" || item?.attributes?.Age === ageGroup;
    const actorFilter = actor === "all" || item?.attributes?.Actor === actor;

    return categoryFilter && languageFilter && ageGroupFilter && actorFilter;
  });

  return (
    <>
      <div className="heading">
        <img src={imagePath} style={{ width: "80px", height: "auto" }} />
      </div>
      <div className="App">
        <div className="product-container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {/* Filter dropdown */}
            <select
              className="filterBox"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
            >
              <option value="all">Age</option>
              <option value={1}>1 </option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
            </select>
            <select
              className="filterBox"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="all">Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Assamese">Assamese</option>
              <option value="Tamil">Tamil</option>
              <option value="Marathi">Marathi</option>
              <option value="Kannada">Kannada</option>
            </select>
            <select
              className="filterBox"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Theme</option>
              <option value="Video">Video</option>
              <option value="PDF">PDF</option>
              <option value="Audio">Audio</option>
              <option value="Read">Read</option>
              <option value="Other">Other</option>
            </select>
            <select
              className="filterBox"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
            >
              <option value="all">Actor</option>
              <option value="Student">Student</option>
              <option value="Parent">Parent</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>
          {filteredStory.map((product, index) => (
            <div key={index}>
              <ProductCard product={product} />
              <button
                onClick={() => {
                  navigate("/storyDetails", {
                    state: {
                      product: product,
                    },
                  });
                }}
              >
                View Story
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="headerDiv">
        <span>Developed with ❤️ at Tekdi Technologies </span>
        <span>Powered by ONEST </span>
      </div>
    </>
  );
}
