import React from "react";
import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import CourseList from "./pages/CourseList";
import MyLearning from "./pages/MyLearning";
import CourseDetails from "./pages/CourseDetails";
import VideoList from "./pages/VideoList";
import VideoDetails from "./pages/VideoDetails";
import QrScanner from "./pages/QrScanner";
import HomePage from "pages/HomePage";
import VoiceSearch from "./pages/VoiceSearch";
import MyCourses from "pages/MyCourses";
import CourseToc from "pages/CourseToc";
import TopicToc from "pages/TopicToc";
import LessonsToc from "pages/LessonsToc";
import TopicList from "pages/TopicToc";
import Aisearch from "pages/Aisearch";
import StudentApp from "pages/StudentApp";
import Chatbot from "pages/Chatbot";
import TeacherApp from "pages/TeacherApp";
import Teacherqr from "pages/TeacherQr";
import VirtualSchool from "pages/VirtualSchool";
import StoryBot from "pages/StoryBot";
import ChatPage from "pages/ChatPage";
import Microphone from "pages/VoiceBot";
import SchemeBot from "pages/SchemeBot";
import SchemeLang from "pages/SchemeLang";

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
      moduleName: "homepage",
      path: "/",
      component: HomePage,
    },
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
    {
      moduleName: "qrscanner",
      path: "/teacherqr",
      component: Teacherqr,
    },
    {
      moduleName: "voicesearch",
      path: "/voicesearch",
      component: VoiceSearch,
    },
    {
      moduleName: "mycourses",
      path: "/mycourses",
      component: MyCourses,
    },
    {
      moduleName: "mylearning",
      path: "studentprogram/subjects",
      component: CourseToc,
    },
    {
      moduleName: "mylearning",
      path: "/studentprogram/:subjectname",
      component: TopicToc,
    },

    {
      moduleName: "mylearning",
      path: "/studentprogram/lessons/:id/:type",
      component: LessonsToc,
    },
    {
      moduleName: "mylearning",
      path: "/aisearch",
      component: Aisearch,
    },
    {
      moduleName: "mylearning",
      path: "/studentapp",
      component: StudentApp,
    },
    {
      moduleName: "mylearning",
      path: "/teacherapp",
      component: TeacherApp,
    },
    {
      moduleName: "mylearning",
      path: "/studentapp/chatbot",
      component: Chatbot,
    },

    {
      moduleName: "mylearning",
      path: "/virtualschool",
      component: VirtualSchool,
    },

    {
      moduleName: "mylearning",
      path: "/virtualschool/:gradeNumber/:videolist",
      component: VideoList,
    },

    {
      moduleName: "mylearning",
      path: "/storybot",
      component: StoryBot,
    },
    {
      moduleName: "mylearning",
      path: "/schemeLang",
      component: SchemeLang,
    },
    {
      moduleName: "mylearning",
      path: "/schemeLang/schemebot/:name/:selectedOption",
      component: SchemeBot,
    },

    {
      moduleName: "chatpage",
      path: "/storybot/chatpage/:name/:selectedOption/:ageOption/:topicOption",
      component: ChatPage,
    },

    {
      moduleName: "chatpage",
      path: "/voicebot",
      component: Microphone,
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
    // {
    //   moduleName: "mylearning",
    //   path: "/",
    //   component: CourseList,
    // },
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
      skipLogin={true}
      _authComponent={{ swPath: "/modules/worksheet" }}
    />
  );
}

export default App;
