import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import Form from "./Form";

const LeftMenuBar = ({ showMenu, refetch, article, category }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);

  const statusOptions = [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
  ];

  return (
    <div className="flex">
      <MenuBar showMenu={showMenu} title="Articles">
        <MenuBar.Block count={article.length} label="All" />
        {statusOptions.map(option => (
          <MenuBar.Block
            count={article.filter(e => e.status === option.value).length}
            key={option.label}
            label={option.label}
          />
        ))}
        <MenuBar.SubTitle
          iconProps={[
            {
              icon: Search,
              onClick: () =>
                setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed),
            },
            {
              icon: Plus,
              onClick: () =>
                setIsAddCollapsed(isAddCollapsed => !isAddCollapsed),
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
        {!isAddCollapsed && (
          <Form refetch={refetch} setIsAddCollapsed={setIsAddCollapsed} />
        )}
        {category.map(category => (
          <MenuBar.Block count={80} key={category.name} label={category.name} />
        ))}
      </MenuBar>
    </div>
  );
};

export default LeftMenuBar;
