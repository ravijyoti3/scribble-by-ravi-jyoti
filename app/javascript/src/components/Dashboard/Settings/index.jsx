import React from "react";

import { useLocation } from "react-router-dom";

import Categories from "./Categories";
import General from "./General";
import Redirections from "./Redirections";
import SideMenuBar from "./SideMenuBar";

const Settings = () => {
  const { search } = useLocation();
  const getCurrentTab = param => new URLSearchParams(search).get(param);
  const currentTab = getCurrentTab("tab");

  return (
    <div className="flex">
      <SideMenuBar className="px-5" />
      {currentTab === "general" && <General />}
      {currentTab === "redirections" && <Redirections />}
      {currentTab === "categories" && <Categories />}
    </div>
  );
};

export default Settings;
