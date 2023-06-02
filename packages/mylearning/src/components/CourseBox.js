import {
  capture,
  IconByName,
  telemetryFactory,
  H2,
  Caption,
  likeRegistryService,
  overrideColorTheme,
  BodySmall,
  BodyMedium,
  ProgressBar,
  coursetrackingRegistryService,
} from "@shiksha/common-lib";
import { Avatar, Box, HStack, Pressable, Stack, VStack } from "native-base";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import colorTheme from "../colorTheme";
import AttributeComponent from "./AttributeComponent";
const colors = overrideColorTheme(colorTheme);

const ONGOING = "Ongoing";
const ASSIGNED = "Assigned";
const COMPLETED = "Completed";

const AttributeData = [
  // { icon: "TimeLineIcon", label: "DURATION", attribute: "duration" },
  { icon: "CalendarCheckLineIcon", label: "DUE_DATE", attribute: "dueDate" },
  { icon: "BookLineIcon", label: "Medium", attribute: "medium" },
  // { icon: "AccountBoxLineIcon", label: "TAKEN_BY", attribute: "takenBy" },
];

export default function LearningBox({
  item,
  url,
  canShowButtonArray,
  isHeaderHide,
  _addIconButton,
  _box,
  appName,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const randomColors = [
    "lightBlue.800",
    "indigo.900",
    "fuchsia.700",
    "rose.600",
  ];
  const [like, setLike] = React.useState({});
  const [likes, setLikes] = React.useState([]);
  const [showButtonArray, setShowButtonArray] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [random, setRandom] = React.useState();
  const { sub } = jwt_decode(localStorage.getItem("token"));
  const authUserId = localStorage.getItem("id");

  React.useEffect(async (e) => {
    let isMounted = true;
    if (isMounted) {
      setRandom(Math.floor(Math.random() * (4 - 1) + 1) - 1);
      await getLikes();
      await getComments();
      if (item.state === "DRAFT") {
        setShowButtonArray(["Like"]);
      } else {
        setShowButtonArray(canShowButtonArray);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getLikes = async () => {
    const result = await coursetrackingRegistryService.getLikes(item?.id);
    const newData = result.find((e, index) => e.userId === authUserId);
    setLikes(result ? result : []);
    setLike(newData ? newData : {});
  };

  const getComments = async () => {
    const result = await coursetrackingRegistryService.getComments(item.id);
    setComments(result ? result : []);
  };

  const handleLike = async () => {
    if (like.id) {
      const result = await likeRegistryService.distory({
        id: like.id,
      });
      setLike({});
      const newData = likes.filter((e) => e.id !== like.id);
      setLikes(newData);
    } else {
      let newData = {
        contextId: item?.id,
        context: "CourseTracking",
        type: "like",
      };
      const osid = await likeRegistryService.create(newData);
      const telemetryData = telemetryFactory.interact({
        appName,
        type: "Course-Like",
        courseId: item?.courseId,
        source: item.source,
        subject: item?.subject,
      });
      capture("INTERACT", telemetryData);
      const newObject = { ...newData, id: osid };
      setLike(newObject);
      setLikes([...likes, newObject]);
    }
  };

  const handleShare = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Course-Share",
      courseId: item?.courseId,
      source: item.source,
      subject: item?.subject,
    });
    capture("INTERACT", telemetryData);
    // navigate(`/mylearning/${item.id}/share`);
  };

  const RightButton = (propData) => {
    let props = {
      name: "InformationLineIcon",
      _icon: { size: 25 },
      bg: colors.white,
      p: 1,
      rounded: "full",
      ...propData,
    };

    return <IconByName {...props} {..._addIconButton} />;
  };

  return (
    <Box
      p="5"
      borderWidth="1"
      borderColor={colors.lightGray2}
      rounded="lg"
      {..._box}
    >
      <VStack space={4}>
        {!isHeaderHide ? (
          <HStack justifyContent="space-between" alignItems="flex-start">
            <Pressable onPress={() => (url ? navigate(url) : "")} flex={1}>
              <HStack space={2} alignItems="center">
                <Avatar
                  bg={randomColors[random]}
                  size="57"
                  rounded="md"
                  {...(item.posterImage
                    ? {
                        source: {
                          uri: item.posterImage,
                        },
                      }
                    : {})}
                  style={{ borderRadius: "6px" }}
                >
                  <H2 color="white">
                    {item?.name?.toUpperCase().trim().substr(0, 2)}
                  </H2>
                </Avatar>
                <Stack space="1" flex={1}>
                  <VStack space="1px">
                    <H2>{item?.name}</H2>
                  </VStack>
                  <HStack space={1} alignItems="center">
                    <IconByName
                      name="Heart3FillIcon"
                      color={colors.eventError}
                      _icon={{ size: 12 }}
                      isDisabled
                    />
                    <Caption>{(likes ? likes.length : 0) + " likes"}</Caption>
                    <Caption>
                      ({(comments ? comments.length : 0) + " comments"})
                    </Caption>
                  </HStack>
                </Stack>
              </HStack>
            </Pressable>
            <RightButton flex={1 / 15} alignItems="flex-end" />
          </HStack>
        ) : (
          <React.Fragment />
        )}
        <BodyMedium
          color={colors.worksheetText}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {item?.description}
        </BodyMedium>
        {/* <AttributeComponent data={AttributeData} object={item} /> */}
        {/* <HStack space="4" alignItems="center">
          <BodySmall>{t("PROGRESS")}</BodySmall>
           <ProgressBar
            flex="1"
            sufix={"%"}
            data={[
              {
                color: colors.success,
                value: 50,
              },
              {
                color: colors.danger,
                value: 50,
              },
            ]}
          />
        </HStack> */}
        <HStack space="5">
          {!showButtonArray || showButtonArray.includes("Like") ? (
            <Box shadow="2" p="2" rounded="full">
              <IconByName
                name={like.id ? "Heart3FillIcon" : "Heart3LineIcon"}
                _icon={{ size: 15 }}
                color={colors.primary}
                p="0"
                onPress={handleLike}
              />
            </Box>
          ) : (
            <React.Fragment />
          )}
          {!showButtonArray || showButtonArray.includes("Share") ? (
            <Box shadow="2" p="2" rounded="full">
              <IconByName
                name="ShareLineIcon"
                _icon={{ size: 15 }}
                p="0"
                onPress={handleShare}
              />
            </Box>
          ) : (
            <React.Fragment />
          )}
        </HStack>
      </VStack>
    </Box>
  );
}
