
import {
  useRoutes, useLocation
} from "react-router-dom";

import userStore from "./store/user";
import domainStore from "./store/domain";

import Entrance from "./pages/entrance/Entrance";
import Footer from "./components/Footer";

import Nav from './components/Nav';
import Index from './pages/index/Index';
import Profile from "./pages/profile/Profile";
import ProfileEdit from "./pages/profile/profileEdit/ProfileEdit";
import Problems from "./pages/problem/problems/Problems";
import Contests from "./pages/contest/contests/Contests";
import Status from "./pages/status/Status";
import Homeworks from "./pages/homework/homeworks/Homeworks";
import Rank from "./pages/rank/Rank";
import Domains from "./pages/domains/Domains";
import Security from "./pages/security/Security";
import Problem from "./pages/problemDetail/Problem";
import ContestProblems from "./pages/contest/problems/ContestProblems";
import HomeworkProblems from "./pages/homework/problems/HomeworkProblems";
import RootPanel from "./pages/rootPanel/RootPanel";
import Discussions from "./pages/discussion/discussions/Discussions";
import DiscussionDetail from "./pages/discussion/detail/DiscussionDetail";
import ProblemEdit from "./pages/problem/edit/ProblemEdit";
import HomeworkEdit from "./pages/homework/edit/HomeworkEdit";
import ContestEdit from './pages/contest/edit/ContestEdit'
import DiscussionEdit from "./pages/discussion/edit/DiscussionEdit";
import DomainManage from "./pages/domainManage/DomainMange";
import api from './api'
const App = () => {
  const { token } = userStore();
  const { id: domainID, name: domainName } = domainStore();
  const setDomain = domainStore(state => state.set);
  const location = useLocation();
  const currentUrl = location.pathname;
  const routes = useRoutes([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/domains",
      element: <Domains />,
    },
    {
      path: "/:userID/profile",
      element: <Profile />,
    },
    {
      path: "/problems",
      element: <Problems />,
    },
    {
      path: "/profile/edit",
      element: <ProfileEdit />,
    },
    {
      path: "/contests",
      element: <Contests />,
    },
    {
      path: "/homeworks",
      element: <Homeworks />,
    },
    {
      path: "/status",
      element: <Status />,
    },
    {
      path: "/rank",
      element: <Rank />,
    },
    {
      path: "/security",
      element: <Security />
    },
    {
      path: "/problem/:problemID",
      element: <Problem />
    },
    {
      path: "/problems/contest/:contestID",
      element: <ContestProblems />
    },
    {
      path: "/problems/homework/:homeworkID",
      element: <HomeworkProblems />
    },
    {
      path: "/root",
      element: <RootPanel />
    },
    {
      path: "/discussions",
      element: <Discussions />
    },
    {
      path: "/discussion/:discussionID",
      element: <DiscussionDetail />
    },
    {
      path: "/problem/edit/:problemID",
      element: <ProblemEdit />
    },
    {
      path: "/problem/edit",
      element: <ProblemEdit />
    },
    {
      path: "homework/edit/:homeworkID",
      element: <HomeworkEdit />
    },
    {
      path: "homework/edit",
      element: <HomeworkEdit />
    },
    {
      path: "contest/edit/:contestID",
      element: <ContestEdit />
    },
    {
      path: "contest/edit",
      element: <ContestEdit />
    },
    {
      path: "discussion/edit/:discussionID",
      element: <DiscussionEdit />
    },
    {
      path: "discussion/edit",
      element: <DiscussionEdit />
    },
    {
      path: "admin",
      element: <DomainManage />
    },
  ]);
  //未登录
  if (token == null) {
    return (
      <>
        <Entrance />
        {/* <Footer /> */}
      </>
    )
  }
  //未选择域名
  if (domainID == null) {
    return (
      <>
        <Domains />
        <Footer />
      </>
    )
  }
  //根目录管理
  // if (currentUrl == "/root") {
  //   return (
  //     <>
  //       <RootPanel />
  //       <Footer />
  //     </>
  //   )
  // }
  if (domainName === null || domainName === undefined) {
    api.getDomain(domainID).then(res => {
      if (res.success === true) {
        const domain = res.data.domain;
        setDomain(domain);
      } else {
        alert(res.msg);
      }
    })
  }
  return (
    <>
      {/* animate__animated animate__fadeInUp */}
      <Nav />
      <main className="flex w-full flex-1 justify-center items-start ">
        {routes}
        {/* <Checker></Checker> */}
      </main>
      <Footer />
    </>
  )
}

export default App;
