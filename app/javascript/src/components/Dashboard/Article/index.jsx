import React, { useEffect, useState } from "react";

import { Button, Typography } from "neetoui";
import { Container, Header } from "neetoui/layouts";
import { Link } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ColumnsDropDown from "./ColumnsDropDown";
import LeftMenuBar from "./LeftMenuBar";
import Table from "./Table";

const Dashboard = () => {
  const [articleList, setArticleList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

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

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategoryList(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  return (
    <div className="flex items-start">
      <LeftMenuBar showMenu article={articleList} category={categoryList} />
      <Container>
        <Header
          actionBlock={
            <div className="flex items-center justify-between">
              <ColumnsDropDown />
              <Link to="/articles/create">
                <Button
                  className="ml-3"
                  icon="ri-add-line"
                  label="Add New Article"
                  onClick={() => {}}
                />
              </Link>
            </div>
          }
          searchProps={{
            placeholder: "Search article title",
          }}
        />
        <Typography className="mb-5" style="h3">
          67 Articles
        </Typography>
        <Table data={articleList} />
      </Container>
    </div>
  );
};

export default Dashboard;
