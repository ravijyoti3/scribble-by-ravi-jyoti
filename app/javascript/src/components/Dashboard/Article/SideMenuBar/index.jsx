import React, { useState, useMemo } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { useKey } from "hooks/useKey";

import Form from "./Form";

import { STATUS_OPTIONS } from "../constants";
import { searchCategory } from "../utils";

const SideMenuBar = ({
  showMenu,
  refetch,
  articles,
  categories,
  setArticleFilters,
  articleFilters,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const allArticles = useMemo(() => articles, []);

  useKey("Escape", () => {
    setIsSearchCollapsed(true);
    setIsAddCollapsed(true);
  });

  return (
    <div className="flex">
      <MenuBar showMenu={showMenu} title="Articles">
        <MenuBar.Block
          active={!articleFilters.status}
          count={allArticles.length}
          label="All"
          onClick={() =>
            setArticleFilters(articleFilters => ({
              ...articleFilters,
              status: "",
            }))
          }
        />
        {STATUS_OPTIONS.map(option => (
          <MenuBar.Block
            active={articleFilters.status === option.value}
            count={allArticles.filter(e => e.status === option.value).length}
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
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onCollapse={() => {
            setIsSearchCollapsed(true);
            setSearchQuery("");
          }}
        />
        {!isAddCollapsed && (
          <Form refetch={refetch} setIsAddCollapsed={setIsAddCollapsed} />
        )}
        {searchCategory(categories, searchQuery).map(category => (
          <MenuBar.Block
            active={articleFilters.categoryIds?.includes(category.id)}
            key={category.name}
            label={category.name}
            count={
              allArticles.filter(e => e.category_id === category.id).length
            }
            onClick={() =>
              setArticleFilters(articleFilters => {
                if (articleFilters.categoryIds?.includes(category.id)) {
                  return {
                    ...articleFilters,
                    categoryIds: articleFilters.categoryIds.filter(
                      id => id !== category.id
                    ),
                  };
                }

                return {
                  ...articleFilters,
                  categoryIds: [...articleFilters.categoryIds, category.id],
                };
              })
            }
          />
        ))}
      </MenuBar>
    </div>
  );
};

export default SideMenuBar;
