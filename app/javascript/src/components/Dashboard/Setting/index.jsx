import React from "react";

import { useLocation } from "react-router-dom";

import Categories from "./Categories";
import General from "./General";
import LeftMenuBar from "./LeftMenuBar";
import Redirections from "./Redirections";

const Settings = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const currentTab = useQuery().get("tab");

  return (
    <div className="flex">
      <LeftMenuBar className="px-5" />
      {currentTab === "general" && <General />}
      {currentTab === "redirections" && <Redirections />}
      {currentTab === "categories" && <Categories />}
    </div>
  );
};

export default Settings;
