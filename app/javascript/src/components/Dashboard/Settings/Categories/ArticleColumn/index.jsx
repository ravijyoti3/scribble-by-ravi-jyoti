import React, { useEffect, useState } from "react";

import { Typography, Dropdown, Button, PageLoader } from "neetoui";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useMutation } from "react-query";

import articlesApi from "apis/admin/articles";
import TooltipWrapper from "components/Common/TooltipWrapper";
import EmptyArticles from "images/empty";

import Card from "./Card";

import { onDragEnd } from "../utils";

const ArticleColumn = ({ activeCategory, categoryList, refetch }) => {
  const [articleList, setArticleList] = useState([]);
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);
  const [hideInfo, setHideInfo] = useState(
    localStorage.getItem("hideManageCategoryInfo")
  );

  const { mutate: fetchArticles, isLoading: isLoadingArticles } = useMutation(
    async () => {
      const { data } = await articlesApi.fetch({
        categories: activeCategory.id,
      });

      return data.articles;
    },
    {
      onSuccess: data => setArticleList(data),
      onError: error => logger.error(error),
    }
  );

  const { mutate: moveArticles } = useMutation(
    async categoryId =>
      await articlesApi.bulkUpdate({ ids: selectedArticleIds, categoryId }),
    {
      onSuccess: () => {
        fetchArticles();
        refetch();
        setSelectedArticleIds([]);
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  const { Menu, MenuItem } = Dropdown;

  const hideManageCategoryInfo = () => {
    localStorage.setItem("hideManageCategoryInfo", true);
    setHideInfo(localStorage.getItem("hideManageCategoryInfo"));
  };

  useEffect(() => {
    if (activeCategory?.id) fetchArticles();
    setSelectedArticleIds([]);
  }, [activeCategory, categoryList]);

  if (isLoadingArticles) {
    return (
      <div className="col-span-2">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="col-span-2 px-4 pt-3">
      <div className="mb-4 flex w-full items-center justify-between">
        <Typography style="h4">Manage articles</Typography>
        <TooltipWrapper
          content="Select articles to move them to another category"
          disabled={selectedArticleIds.length === 0}
          followCursor="horizontal"
          position="bottom"
        >
          <Dropdown disabled={selectedArticleIds.length === 0} label="Move To">
            <Menu>
              {categoryList
                .filter(category => category.id !== activeCategory.id)
                .map(category => (
                  <MenuItem.Button
                    key={category.id}
                    onClick={() => moveArticles(category.id)}
                  >
                    {category.name}
                  </MenuItem.Button>
                ))}
            </Menu>
          </Dropdown>
        </TooltipWrapper>
      </div>
      {!hideInfo && (
        <div className="rounded-xs mb-4 bg-indigo-100 p-2">
          <Typography style="body2">
            You can reorder categories or articles by drag and drop here. You
            can also multiselect articles and move them together to any category
            you have created.{" "}
            <Button
              label="Don't show this info again"
              style="link"
              onClick={hideManageCategoryInfo}
            />
          </Typography>
        </div>
      )}
      {articleList.length > 0 ? (
        <DragDropContext
          onDragEnd={finalPosition =>
            onDragEnd(finalPosition, articleList, setArticleList, articlesApi)
          }
        >
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {articleList.map((article, idx) => (
                  <Card
                    article={article}
                    index={idx}
                    key={article.id}
                    selectedArticleIds={selectedArticleIds}
                    setSelectedArticleIds={setSelectedArticleIds}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="grid justify-items-center">
          <img className="w-1/2 " src={EmptyArticles} />
          <Typography className="text-center" style="h3">
            No articles found
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ArticleColumn;
