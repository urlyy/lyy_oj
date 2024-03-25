
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
import ProfileEdit from "./pages/profile/ProfileEdit";
import Problems from "./pages/problem/Problems";
import Status from "./pages/status/Status";
import Homeworks from "./pages/homework/Homeworks";
import Homework from "./pages/homework/Homework";
import HomeworkEdit from "./pages/homework/HomeworkEdit";
import Rank from "./pages/rank/Rank";
import Domains from "./pages/domains/Domains";
import Security from "./pages/security/Security";
import Problem from "./pages/problemDetail/Problem";
import Contests from "./pages/contest/Contests";
import Contest from "./pages/contest/Contest";
import ContestEdit from './pages/contest/ContestEdit'
import RootPanel from "./pages/rootPanel/RootPanel";
import Discussions from "./pages/discussion/Discussions";
import Discussion from "./pages/discussion/Discussion";
import ProblemEdit from "./pages/problem/ProblemEdit";
import DiscussionEdit from "./pages/discussion/DiscussionEdit";
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
      element: <Contest />
    },
    {
      path: "/problems/homework/:homeworkID",
      element: <Homework />
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
      element: <Discussion />
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
    }, {
      path: "root",
      element: <RootPanel />
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
      <main className="flex w-full flex-1 justify-center items-start p-2">
        {routes}
        {/* <Checker></Checker> */}
      </main>
      <Footer />
    </>
  )
}

export default App;
