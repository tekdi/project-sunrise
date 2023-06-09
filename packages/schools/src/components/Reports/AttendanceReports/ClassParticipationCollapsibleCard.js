import React from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
  Spacer,
  Pressable,
  Button,
} from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  ProgressBar,
  overrideColorTheme,
  BodyMedium,
  BodySmall,
} from "@shiksha/common-lib";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);
function ClassParticipationCollapsibleCard() {
  const [progressData, setProgressData] = React.useState([
    {
      name: "22 Present",
      color: "schools.green",
      value: 22,
    },
    {
      name: "4 Absent",
      color: "schools.absent",
      value: 4,
    },
    {
      name: "1 Unmarked",
      color: "schools.unmarked",
      value: 1,
    },
  ]);
  return (
    <Collapsible
      defaultCollapse={true}
      header={
        <Box py={4}>
          <H2>Class Participation</H2>
          <HStack align="middle">
            <BodySmall color={"schools.gray"}>Total 34</BodySmall>
            <Text fontSize="8px" color={"schools.gray"} mx={2}>
              ●
            </Text>
            <BodySmall color={"schools.gray"}>Present 28</BodySmall>
          </HStack>
        </Box>
      }
    >
      <>
        <Divider mb={4} />
        <VStack space={4}>
          {/*bordered box*/}
          <Box>
            <VStack space={6}>
              {/*row 1 box*/}
              <Box>
                <VStack space={6}>
                  <HStack alignItems="center" justifyContent="space-between">
                    <BodyMedium w={"20%"}>Girls</BodyMedium>
                    <Box w={"80%"}>
                      <ProgressBar data={progressData} />
                    </Box>
                  </HStack>

                  <HStack alignItems="center" justifyContent="space-between">
                    <BodyMedium w={"20%"}>Boys</BodyMedium>
                    <Box w={"80%"}>
                      <ProgressBar data={progressData} />
                    </Box>
                  </HStack>

                  <HStack alignItems="center" justifyContent="space-between">
                    <BodyMedium w={"20%"}>Total</BodyMedium>
                    <Box w={"80%"}>
                      <ProgressBar data={progressData} />
                    </Box>
                  </HStack>

                  <HStack alignItems="center" justifyContent="space-between">
                    <HStack alignItems="center">
                      <Box bg={"schools.green"} w="15px" h="15px" rounded={4} />
                      <BodyMedium mx={2}>Present</BodyMedium>
                    </HStack>
                    <HStack alignItems="center">
                      <Box
                        bg={"schools.absent"}
                        w="15px"
                        h="15px"
                        rounded={4}
                      />
                      <BodyMedium mx={2}>Absent</BodyMedium>
                    </HStack>
                    <HStack alignItems="center">
                      <Box
                        bg={"schools.unmarked"}
                        w="15px"
                        h="15px"
                        rounded={4}
                      />
                      <BodyMedium mx={2}>Unmarked</BodyMedium>
                    </HStack>
                  </HStack>

                  <Text>
                    <BodyMedium bold>Note:</BodyMedium>{" "}
                    <BodyMedium color={"schools.bodyText"}>
                      Monthly Report will be generated on the last day of every
                      month.
                    </BodyMedium>
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </>
    </Collapsible>
  );
}
export default ClassParticipationCollapsibleCard;
