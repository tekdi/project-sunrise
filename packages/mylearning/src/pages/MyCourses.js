import React from "react";
import {
  capture,
  FilterButton,
  H3,
  IconByName,
  Layout,
  Loading,
  telemetryFactory,
  H2,
  SearchLayout,
  BodySmall,
  coursetrackingRegistryService,
  NameTag,
  arryaFilters,
} from "@shiksha/common-lib";
import { useSSR, useTranslation } from "react-i18next";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import { useParams } from "react-router-dom";
import manifest from "../manifest.json";
import { defaultInputs } from "config/mylearningConfig";
import MyCoursesComponent from "components/MyCoursesComponent";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import styles from "./MyCourses.module.css";
import Select from "react-select";
import { useState } from "react";
const sortArray = [
  {
    title: "By Difficulty",
    data: [
      {
        attribute: "difficulty",
        value: "low_high",
        name: "Low to High",
        icon: "ArrowRightUpLineIcon",
      },
      {
        attribute: "difficulty",
        value: "high_low",
        name: "High To Low",
        icon: "ArrowRightDownLineIcon",
      },
    ],
  },
  {
    title: "By Popularity",
    data: [
      {
        attribute: "popularity",
        value: "low_high",
        name: "Low to High",
        icon: "ArrowRightUpLineIcon",
      },
      {
        attribute: "popularity",
        value: "high_low",
        name: "High To Low",
        icon: "ArrowRightDownLineIcon",
      },
    ],
  },
  {
    title: "By Due Date",
    data: [
      {
        attribute: "dueDate",
        value: "low_high",
        name: "Low to High",
        icon: "ArrowRightUpLineIcon",
      },
      {
        attribute: "dueDate",
        value: "high_low",
        name: "High To Low",
        icon: "ArrowRightDownLineIcon",
      },
    ],
  },
];

const language = [
  { value: "Letters", label: "Letters" },
  { value: "Words", label: "Words" },
  { value: "Short Para", label: "Short Para" },
  { value: "Long Para", label: "Long Para" },
];
const resource = [
  { value: "Read", label: "Read" },
  { value: "Learn", label: "Learn" },
];

const ONGOING = "Ongoing";
const ASSIGNED = "Assigned";
const COMPLETED = "Completed";

export default function MyCourses({ footerLinks, appName }) {
  const [isVisible, setIsVisible] = useState(true);
  const [preferenceVisible, setpreferenceVisible] = useState(false);
  const handleButtonClick = () => {
    setIsVisible(false);
    setpreferenceVisible(true);
  };
  const handlePreferenceButtonClick = () => {
    setIsVisible(true);
    setpreferenceVisible(false);
  };
  const { t } = useTranslation();
  const [filterObject, setFilterObject] = React.useState({});
  const [courses, setCourses] = React.useState([]);
  const [apiCourses, setApiCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [searchState, setSearchState] = React.useState(false);
  const [showModalSort, setShowModalSort] = React.useState(false);
  const [courseStartTime, setCourseStartTime] = React.useState();
  const [filters, setFilters] = React.useState();
  const navigate = useNavigate();

  const { state } = useParams();
  const userId = localStorage.getItem("id");
  const handleSearchState = (item) => {
    setSearchState(item);
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Course-search",
    });
    capture("INTERACT", telemetryData);
  };

  const leavePageCaptureEvent = () => {
    if (courseStartTime) {
      const telemetryData = telemetryFactory.interact({
        appName,
        type: "Course-Exploring-End",
        state,
        duration: courseStartTime
          ? moment().diff(courseStartTime, "seconds")
          : 0,
      });
      capture("END", telemetryData);
    }
  };

  const handleBackButton = () => {
    leavePageCaptureEvent();
    navigate(-1);
  };

  React.useEffect(() => {
    simulateEvent();
  });

  const simulateEvent = () => {
    console.log(filterObject);
    console.log("My use Effect");
  };

  React.useEffect(async () => {
    const courseData = await coursetrackingRegistryService.getAll({
      channel: "013710046929969152321",
      adapter: "diksha",
    });
    setCourses(courseData.slice(0, 10));
    setApiCourses(courseData);
    let subjectData = [];
    courseData
      .filter((e) => e.subject)
      .forEach((e) => {
        subjectData = [...subjectData, ...e?.subject];
      });
    subjectData = subjectData.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    setFilters([
      {
        name: "Language",
        attributeName: "medium",
        data: ["Letters", "Words", "Short Para", "Long Para"],
      },
      {
        name: "Resource Type",
        attributeName: "resourceType",
        data: ["Read", "Learn"],
      },
    ]);
    setLoading(false);
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Course-Exploring-Start",
      state,
    });
    capture("START", telemetryData);
    setCourseStartTime(moment());

    return () => {
      leavePageCaptureEvent();
    };
  }, []);

  React.useEffect(() => {
    const searchData = search ? search.toLowerCase() : "";
    const apiData = arryaFilters(apiCourses, filterObject);
    const data = apiData.filter(
      (item) =>
        item?.name?.toLowerCase().indexOf(searchData) > -1 ||
        item?.description?.toLowerCase().indexOf(searchData) > -1
    );
    setCourses(data.slice(0, 10));
  }, [search, filterObject]);

  const getTitle = () => {
    return t("CONTENT DELIVERY");
  };

  const getSubTitle = () => {
    return t("See my courses here");
  };

  if (loading) {
    return <Loading />;
  }

  if (searchState) {
    return (
      <SearchLayout
        {...{
          search,
          setSearch,
          minStringLenght: 3,
          notFoundMessage: t("TYPE_TO_START_SEARCHING_LEARNING"),
          onCloseSearch: setSearchState,
        }}
      >
        <Children
          {...{
            courses,
            isHideCreateButton: true,
            setFilterObject,
            state,
            filters,
          }}
        />
      </SearchLayout>
    );
  }

  const medium = (selectedOptions) => {
    let newfilter = selectedOptions.map((option) => option.value);
    console.log(newfilter);

    // new filter has selected Array data

    const data = selectedOptions;

    // existing setFilterObject state accepts Array data as an object with a property medium refer log in simulateevent()

    const transformedData = {
      medium: data.map((item) => item.value),
    };

    //data transformed into object with property medium

    console.log("transformedData");

    console.log(transformedData);

    setFilterObject(transformedData);
  };

  const resourceType = (selectedOptions) => {
    let newfilter = selectedOptions.map((option) => option.value);
    console.log(newfilter);

    // new filter has selected Array data

    const data = selectedOptions;

    // existing setFilterObject state accepts Array data as an object with a property medium refer log in simulateevent()

    const transformedData = {
      resourceType: data.map((item) => item.value),
    };

    //data transformed into object with property medium

    console.log("transformedData");

    console.log(transformedData);

    setFilterObject(transformedData);
  };

  return (
    <React.Fragment>
      {isVisible && (
        <div className={styles.selectouterdiv}>
          <div className={styles.selectdiv}>
            <div className={styles.selectdiscover}>
              To discover relevant content update the following details
            </div>
            <h3 className={styles.selectdiscover}>Select Language</h3>
            <Select options={language} isMulti onChange={medium} />
            <h3 className={styles.selectdiscover}>Select Resource Type</h3>
            <Select options={resource} isMulti onChange={resourceType} />
            <button onClick={handleButtonClick} className={styles.donebutton}>
              Done
            </button>
          </div>
        </div>
      )}
      <Layout
        _header={{
          title: getTitle(),
          // iconComponent: (
          //   <Button
          //     rounded="full"
          //     variant="outline"
          //     bg={"mylearning.primaryLight"}
          //     px={4}
          //     py={1}
          //     rightIcon={
          //       <IconByName
          //         name="ArrowDownSLineIcon"
          //         isDisabled
          //         _icon={{ size: 20 }}
          //       />
          //     }
          //     onPress={(e) => setShowModalSort(true)}
          //   >
          //     <BodyLarge textTransform="capitalize" color={"mylearning.primary"}>
          //       {t("SORT")}
          //     </BodyLarge>
          //   </Button>
          // ),
        }}
        _appBar={{
          languages: manifest.languages,
          isEnableSearchBtn: true,
          setSearch,
          setSearchState: handleSearchState,
          onPressBackButton: handleBackButton,
          isBackButtonShow: true,
          isLanguageIcon: true,
          isQRcodebutton: true,
          titleComponent: <NameTag />,
        }}
        subHeader={
          <H2 textTransform="inherit">
            {/* {getSubTitle()} */}
            {preferenceVisible && (
              <button
                onClick={handlePreferenceButtonClick}
                className={styles.preferencesbutton}
              >
                Reset Prefererences
              </button>
            )}
          </H2>
        }
        _subHeader={{ bg: "mylearning.cardBg" }}
        _footer={footerLinks}
      >
        <Children
          {...{
            courses,
            setFilterObject,
            showModalSort,
            setShowModalSort,
            appName,
            state,
            filters,
          }}
        />
      </Layout>
    </React.Fragment>
  );
}

const Children = ({
  state,
  courses,
  setFilterObject,
  showModalSort,
  setShowModalSort,
  appName,
  filters,
}) => {
  const { t } = useTranslation();
  const [sortData, setSortData] = React.useState();

  const handleSort = (obejct) => {
    const newSort = { [obejct.attribute]: obejct.value };
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Course-Sort",
      sortType: newSort,
    });
    capture("INTERACT", telemetryData);
    setSortData(newSort);
  };

  //   const handleFilter = (obejct) => {
  //     // const telemetryData = telemetryFactory.interact({
  //     //   appName,
  //     //   type: "Course-Filter",
  //     //   filterObject: obejct,
  //     // });
  //     // capture("INTERACT", telemetryData);
  //     setFilterObject(obejct);
  //   };

  const getState = () => {
    if (state === ONGOING) {
      return t("ONGOING");
    } else if (state === ASSIGNED) {
      return t("ASSIGNED");
    } else if (state === COMPLETED) {
      return t("COMPLETED");
    }
  };

  return (
    <Stack>
      {/* <FilterButton
        getObject={handleFilter}
        _box={{ pt: 5, px: 5 }}
        _actionSheet={{ bg: "mylearning.cardBg" }}
        resetButtonText={t("COLLAPSE")}
        filters={filters}
      /> */}
      <VStack>
        <Box
          bg={"mylearning.white"}
          pt="0"
          p="5"
          mb="4"
          roundedBottom={"xl"}
          shadow={2}
        >
          <MyCoursesComponent
            seeButton={<React.Fragment />}
            appName={appName}
            data={courses}
            leftTitle={
              state ? (
                <VStack>
                  <H2>{getState()}</H2>
                  <BodySmall>
                    {courses.length} {t("COURSES")}
                  </BodySmall>
                </VStack>
              ) : (
                <React.Fragment />
              )
            }
          />
        </Box>
      </VStack>
      <Actionsheet
        isOpen={showModalSort}
        onClose={() => setShowModalSort(false)}
      >
        <Stack width={"100%"} maxH={"100%"}>
          <Actionsheet.Content alignItems={"left"} bg={"mylearning.cardBg"}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="15px">
                <H2>{t("SORT")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={"mylearning.cardCloseIcon"}
                onPress={(e) => setShowModalSort(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <ScrollView width={"100%"} space="1" bg={"mylearning.coolGray"}>
            <VStack bg={"mylearning.white"} width={"100%"} space="1">
              {sortArray.map((value, index) => (
                <Box key={index}>
                  <Box px="5" py="4">
                    <H3 color={"mylearning.grayLight"}>{value?.title}</H3>
                  </Box>
                  {value?.data &&
                    value.data.map((item, subIndex) => {
                      const isSelected =
                        sortData?.[item.attribute] &&
                        sortData[item.attribute] === item.value;
                      return (
                        <Pressable
                          key={subIndex}
                          p="5"
                          bg={isSelected ? "mylearning.grayLight" : ""}
                          onPress={(e) => handleSort(item)}
                        >
                          <HStack
                            space="2"
                            colorScheme="button"
                            alignItems="center"
                          >
                            <IconByName
                              isDisabled
                              color={isSelected ? "mylearning.primary" : ""}
                              name={item.icon}
                            />
                            <Text>{item.name}</Text>
                          </HStack>
                        </Pressable>
                      );
                    })}
                </Box>
              ))}
              <Box p="5">
                <Button
                  colorScheme="button"
                  _text={{ color: "mylearning.white" }}
                  onPress={(e) => setShowModalSort(false)}
                >
                  {t("CONTINUE")}
                </Button>
              </Box>
            </VStack>
          </ScrollView>
        </Stack>
      </Actionsheet>
    </Stack>
  );
};
