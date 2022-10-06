import React, { useEffect, useState } from "react";

import { MenuBar } from "neetoui/layouts";
import { Link } from "react-router-dom";

import { LEFT_MENU_ITEMS } from "./constants";

const LeftMenuBar = () => {
  const [activeTab, setActiveTab] = useState(window.location.pathname);

  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <div className="flex">
      <MenuBar showMenu title="">
        {LEFT_MENU_ITEMS.map(item => (
          <Link key={item.id} to={item.linkTo}>
            <MenuBar.Item
              active={activeTab === item.linkTo}
              description={item.description}
              label={item.label}
              onClick={() => {
                setActiveTab(item.linkTo);
              }}
            />
          </Link>
        ))}
      </MenuBar>
    </div>
  );
};

export default LeftMenuBar;
