import React, { useState, useMemo } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { append, assoc, filter } from "ramda";

import { useKey } from "hooks/useKey";

import Form from "./Form";

import { STATUS_OPTIONS } from "../constants";
import { searchCategory } from "../utils";

const SideMenuBar = ({
  showMenu,
  refetch,
  categories,
  setArticleFilters,
  articleFilters,
  setCurrentPageNumber,
  articleCount,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const articlesCount = useMemo(() => articleCount, []);

  useKey("Escape", () => {
    setIsSearchCollapsed(true);
    setIsAddCollapsed(true);
  });

  return (
    <div className="flex">
      <MenuBar showMenu={showMenu} title="Articles">
        <MenuBar.Block
          active={!articleFilters.status}
          count={articlesCount.all}
          label="All"
          onClick={() => {
            setArticleFilters(assoc("status", ""));
            setCurrentPageNumber(1);
          }}
        />
        {STATUS_OPTIONS.map(option => (
          <MenuBar.Block
            active={articleFilters.status === option.value}
            key={option.label}
            label={option.label}
            count={
              option.value === "published"
                ? articlesCount.published
                : articlesCount.draft
            }
            onClick={() => {
              setArticleFilters(assoc("status", option.value));
              setCurrentPageNumber(1);
            }}
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
            count={category.articles.length}
            key={category.name}
            label={category.name}
            onClick={() => {
              setArticleFilters(articleFilters => {
                if (articleFilters.categoryIds?.includes(category.id)) {
                  return assoc(
                    "categoryIds",
                    filter(
                      id => id !== category.id,
                      articleFilters.categoryIds
                    ),
                    articleFilters
                  );
                }

                return assoc(
                  "categoryIds",
                  append(category.id, articleFilters.categoryIds),
                  articleFilters
                );
              });
              setCurrentPageNumber(1);
            }}
          />
        ))}
      </MenuBar>
    </div>
  );
};

export default SideMenuBar;
