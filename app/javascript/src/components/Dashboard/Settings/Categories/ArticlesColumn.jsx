import React, { useEffect, useState } from "react";

import { Typography, Dropdown, Button } from "neetoui";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import articlesApi from "apis/admin/articles";

import ArticleCard from "./ArticleCard";

const ArticlesColumn = () => {
  const [articleList, setArticleList] = useState([]);

  const { Menu, MenuItem } = Dropdown;

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch();
      setArticleList(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const reorder = (articleList, startIndex, endIndex) => {
    const shuffledArticleList = Array.from(articleList);
    const [removed] = shuffledArticleList.splice(startIndex, 1);
    shuffledArticleList.splice(endIndex, 0, removed);

    return shuffledArticleList;
  };

  const onDragEnd = async finalPosition => {
    if (finalPosition.destination) {
      const reorderedItems = reorder(
        articleList,
        finalPosition.source.index,
        finalPosition.destination.index
      );
      setArticleList(reorderedItems);
    }
  };

  return (
    <div className="col-span-2 px-4 pt-3">
      <div className="mb-4 flex w-full items-center justify-between">
        <Typography style="h4">Manage articles</Typography>
        <Dropdown buttonStyle="secondary" label="Move To">
          <Menu>
            <MenuItem.Button style="danger">Delete</MenuItem.Button>
          </Menu>
        </Dropdown>
      </div>
      <div className="rounded-xs mb-4 bg-indigo-100 p-2">
        <Typography style="body2">
          You can reorder categories or articles by drag and drop here. You can
          also multiselect articles and move them together to any category you
          have created.{" "}
          <Button label="Don't show this info again" style="link" />
        </Typography>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {articleList.map((article, idx) => (
                <ArticleCard
                  article={article}
                  articleList={articleList}
                  index={idx}
                  key={article.id}
                  refetch={fetchArticles}
                  setArticleList={setArticleList}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ArticlesColumn;
