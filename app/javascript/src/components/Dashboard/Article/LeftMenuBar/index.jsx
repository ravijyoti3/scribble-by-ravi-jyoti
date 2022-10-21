import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import Form from "./Form";

import { STATUS_OPTIONS } from "../constants";

const LeftMenuBar = ({
  showMenu,
  refetch,
  article,
  category,
  setArticleFilters,
  articleFilters,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);

  return (
    <div className="flex">
      <MenuBar showMenu={showMenu} title="Articles">
        <MenuBar.Block
          active={!articleFilters.status}
          count={article.length}
          label="All"
          onClick={() =>
            setArticleFilters(articleFilters => ({
              ...articleFilters,
              status: null,
            }))
          }
        />
        {STATUS_OPTIONS.map(option => (
          <MenuBar.Block
            active={articleFilters.status === option.value}
            count={article.filter(e => e.status === option.value).length}
            key={option.label}
            label={option.label}
            onClick={() =>
              setArticleFilters(articleFilters => ({
                ...articleFilters,
                status: option.value,
              }))
            }
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
          <MenuBar.Block
            active={articleFilters.category_id?.includes(category.id)}
            count={80}
            key={category.name}
            label={category.name}
            onClick={() =>
              setArticleFilters(articleFilters => {
                if (articleFilters.category_id?.includes(category.id)) {
                  return {
                    ...articleFilters,
                    category_id: articleFilters.category_id.filter(
                      id => id !== category.id
                    ),
                  };
                }

                return {
                  ...articleFilters,
                  category_id: [...articleFilters.category_id, category.id],
                };
              })
            }
          />
        ))}
      </MenuBar>
    </div>
  );
};

export default LeftMenuBar;
