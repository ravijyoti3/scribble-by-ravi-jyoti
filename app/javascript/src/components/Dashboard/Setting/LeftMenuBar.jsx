import React from "react";

import { MenuBar } from "neetoui/layouts";
import { Link, useLocation } from "react-router-dom";

import { LEFT_MENU_ITEMS } from "./constants";

const LeftMenuBar = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const currentTab = useQuery().get("tab");

  return (
    <div className="flex">
      <MenuBar showMenu title="">
        {LEFT_MENU_ITEMS.map(item => (
          <Link key={item.id} to={`settings?tab=${item.tab}`}>
            <MenuBar.Item
              active={currentTab === item.tab}
              description={item.description}
              label={item.label}
            />
          </Link>
        ))}
      </MenuBar>
    </div>
  );
};

export default LeftMenuBar;
