import { useRef, lazy, Suspense } from "react";
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
import ProfileEdit from "./pages/profileEdit/ProfileEdit";
import Problems from "./pages/problems/Problems";
import Contests from "./pages/contests/Contests";
import Status from "./pages/status/Status";
import Homeworks from "./pages/homeworks/Homeworks";
import Rank from "./pages/rank/Rank";
import Domains from "./pages/domains/Domains";
import Security from "./pages/security/Security";


const App = () => {
  const { token } = userStore();
  const { id: domainID } = domainStore();
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
      path: "security",
      element: <Security />
    }
  ]);
  if (token == null) {
    return (
      <>
        <div className="flex flex-1 items-center justify-center">
          <Entrance />
        </div>
        <Footer />
      </>
    )
  }
  if (domainID == null) {
    return (
      <>
        <Domains />
        <Footer />
      </>
    )
  }
  return (
    <>
      <Nav />
      <main className="flex w-full flex-1 justify-center items-start">
        <div className="w-3/5 h-full flex">
          {routes}
        </div>
        {/* <Checker></Checker> */}
      </main>
      <Footer />
    </>
  )
}

export default App;