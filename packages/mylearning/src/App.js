import React from "react";
import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import CourseList from "./pages/CourseList";
import MyLearning from "./pages/MyLearning";
import CourseDetails from "./pages/CourseDetails";
import VideoList from "./pages/VideoList";
import VideoDetails from "./pages/VideoDetails";
import QrScanner from "./pages/QrScanner";
const StudentprogramLessonList = React.lazy(() =>
  import("studentprogram/Lessons")
);
function App() {
  initializeI18n(
    ["mylearning"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      moduleName: "mylearning",
      path: "/mylearning",
      component: CourseList,
    },
    {
      moduleName: "qrscanner",
      path: "/qrscanner",
      component: QrScanner,
    },
    // {
    //   moduleName: "mylearning",
    //   path: "/mylearning/list/:state",
    //   component: CourseList,
    // },
    // {
    //   moduleName: "mylearning",
    //   path: "/mylearning/list",
    //   component: CourseList,
    // },

    {
      moduleName: "mylearning",
      path: "/mylearning/:id/:type",
      component: StudentprogramLessonList,
    },
    // {
    //   moduleName: "mylearning",
    //   path: "/mylearning/video/list/:state",
    //   component: VideoList,
    // },
    // {
    //   moduleName: "mylearning",
    //   path: "/mylearning/video/list",
    //   component: VideoList,
    // },
    // {
    //   moduleName: "mylearning",
    //   path: "/mylearning/video/:id/view",
    //   component: VideoDetails,
    // },
    {
      moduleName: "mylearning",
      path: "/mylearning",
      component: CourseList,
    },
    {
      moduleName: "mylearning",
      path: "/",
      component: CourseList,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));
  const skipLogin = !(
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  );

  return (
    <AppShell
      AuthComponent={LoginComponent}
      themeName={"joyfull"}
      footerLinks={[]}
      basename={process.env.PUBLIC_URL}
      routes={routes}
      isShowFooterLink={true}
      appName="Teacher App"
      skipLogin={skipLogin}
      _authComponent={{ swPath: "/modules/worksheet" }}
    />
  );
}

export default App;
