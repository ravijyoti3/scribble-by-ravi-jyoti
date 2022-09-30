import React, { useState } from "react";

import { Search } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

const LeftMenuBar = ({ showMenu }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  return (
    <div className="flex">
      <MenuBar showMenu={showMenu} title="Articles">
        <MenuBar.Block active count={9} label="All" />
        <MenuBar.Block count={2} label="Draft" />
        <MenuBar.Block count={7} label="Published" />
        <MenuBar.SubTitle
          iconProps={[
            {
              icon: Search,
              onClick: () =>
                setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed),
            },
          ]}
        >
          <Typography
            component="h4"
            style="h5"
            textTransform="uppercase"
            weight="bold"
          >
            CATEGORIES
          </Typography>
        </MenuBar.SubTitle>
        <MenuBar.Search
          collapse={isSearchCollapsed}
          onCollapse={() => setIsSearchCollapsed(true)}
        />
        <MenuBar.Block count={80} label="Getting Started" />
        <MenuBar.Block count={60} label="App & Integration" />
        <MenuBar.Block count={60} label="Security & Privacy" />
        <MenuBar.Block count={60} label="Misc" />
      </MenuBar>
    </div>
  );
};

export default LeftMenuBar;
