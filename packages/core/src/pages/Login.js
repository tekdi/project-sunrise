import React, { useState } from "react";
import {
  HStack,
  Button,
  Box,
  FormControl,
  Input,
  VStack,
  Alert,
  IconButton,
  CloseIcon,
  Center,
  Avatar,
  Divider,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import manifest from "../manifest";
import {
  fetchToken,
  eventBus,
  useWindowSize,
  userRegistryService,
  BodyMedium,
  Heading,
  Subtitle,
  getUserToken,
  overrideColorTheme,
  Layout,
  IconByName,
  getAuthUser,
} from "@shiksha/common-lib";

const colors = overrideColorTheme();

export default function Login({ swPath }) {
  const [credentials, setCredentials] = useState({
    username: "Parth",
    password: "alt1234",
  });
  const [errors, setErrors] = React.useState({});
  const [show, setShow] = React.useState(false);
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const navigate = useNavigate();

  const fieldsName = [
    { label: "User Name", attribute: "userName" },
    { label: "Password", attribute: "password" },
  ];

  const validate = () => {
    let arr = {};
    if (
      typeof credentials?.username === "undefined" ||
      credentials?.username === ""
    ) {
      arr = { ...arr, username: t("USERNAME_IS_REQUIRED") };
    }

    if (
      typeof credentials?.password === "undefined" ||
      credentials?.password === ""
    ) {
      arr = { ...arr, password: t("PASSWORD_IS_REQUIRED") };
    }

    setErrors(arr);
    if (arr.username || arr.password) {
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validate()) {
      const result = await fetchToken(
        manifest.auth_url,
        credentials?.username,
        credentials?.password
      );

      if (result?.data) {
        let token = result.data.access_token;
        localStorage.setItem("token", token);
        let resultTeacher = {};
        try {
          resultTeacher = await getAuthUser();
        } catch (e) {
          localStorage.removeItem("token");
          console.log({ e });
        }

        if (resultTeacher?.id) {
          // try {
          //   const fcmToken = await getUserToken(swPath);
          //   let id = localStorage.getItem("id");
          //   await userRegistryService.update({ id, fcmToken });
          //   localStorage.setItem("fcmToken", fcmToken);
          // } catch (e) {
          //   localStorage.setItem("fcmToken", "");
          //   console.log({ e });
          // }
          // eventBus.publish("AUTH", {
          //   eventType: "LOGIN_SUCCESS",
          //   data: {
          //     token: token,
          //   },
          // });
          window.location.reload();
        } else {
          localStorage.removeItem("token");
          setErrors({ alert: t("PLEASE_ENTER_VALID_CREDENTIALS") });
        }
      } else {
        localStorage.removeItem("token");
        setErrors({ alert: t("PLEASE_ENTER_VALID_CREDENTIALS") });
      }
    }
  };

  const navigatePage = () => {
    window.location.href = "/";
  };

  return (
    <Layout
      _appBar={{
        languages: manifest.languages,
        isBackButtonShow: false,
        isHideMenuButton: true,
        imageUrl: "../../src/assets/SubjectBg.png",
        LeftIcon: false,

        rightIcon: false,
      }}
      // _height="150px"
    >
      <Box>
        <Center width={width}>
          <VStack space="" w="300px">
            <Center>
              <Box mt={"10px"} w={"500px"} ml={"210px"}>
                <Heading>{t("Welcome to Project Sunrise")}</Heading>
              </Box>
            </Center>

            <VStack space={2} pt={"25px"} pb={"25px"}>
              {"alert" in errors ? (
                <Alert w="100%" status={"error"}>
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      justifyContent="space-between"
                    >
                      <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Subtitle color={colors?.gray}>{errors.alert}</Subtitle>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        icon={<CloseIcon size="3" color={colors?.gray} />}
                        onPress={(e) => setErrors({})}
                      />
                    </HStack>
                  </VStack>
                </Alert>
              ) : (
                <></>
              )}
              <VStack space="30px" p={"20px"}>
                <FormControl isRequired isInvalid={"username" in errors}>
                  <FormControl.Label
                    _text={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#6461D2",
                    }}
                    mb="10px"
                  >
                    {t("USERNAME")}
                  </FormControl.Label>
                  <Input
                    defaultValue="parth"
                    bg="white"
                    variant="rounded"
                    borderColor={
                      credentials?.["username"] ? "orange.500" : "#C1C1C1"
                    }
                    p={"10px"}
                    placeholder={t("ENTER_USERNAME")}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                  />
                  {"username" in errors ? (
                    <FormControl.ErrorMessage
                      _text={{
                        fontSize: "xs",
                        color: colors?.error,
                        fontWeight: 500,
                      }}
                    >
                      {errors.username}
                    </FormControl.ErrorMessage>
                  ) : (
                    <></>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={"password" in errors}>
                  <FormControl.Label
                    _text={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#6461D2",
                    }}
                    mb="10px"
                  >
                    {t("PASSWORD")}
                  </FormControl.Label>
                  <Input
                    defaultValue="alt1234"
                    bg="white"
                    variant="rounded"
                    type={show ? "text" : "password"}
                    borderColor={
                      credentials?.["password"] ? "orange.500" : "#C1C1C1"
                    }
                    p={"10px"}
                    placeholder={t("ENTER_PASSWORD")}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    InputRightElement={
                      <IconByName
                        name={show ? "EyeLineIcon" : "EyeOffLineIcon"}
                        _icon={{ size: 15 }}
                        rounded="full"
                        onPress={() => setShow(!show)}
                      />
                    }
                  />

                  {"password" in errors ? (
                    <FormControl.ErrorMessage
                      _text={{
                        fontSize: "xs",
                        color: colors?.error,
                        fontWeight: 500,
                      }}
                    >
                      {errors.username}
                    </FormControl.ErrorMessage>
                  ) : (
                    <></>
                  )}
                </FormControl>
                <Button p="3" onPress={handleLogin}>
                  {t("LOGIN")}
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </Center>
      </Box>
      <div style={{ width: "500px", marginLeft: "30%" }}>
        <i style={{ fontSize: "12px" }}>
          {" "}
          “Purpose specific, low tech, easy to configure lightweight apps
          powered by DPGs & DPIs”
        </i>
      </div>
    </Layout>
  );
}
