import React, { useEffect, useState } from "react";

import { Button, Typography, PageLoader } from "neetoui";
import { Container, Header } from "neetoui/layouts";
import { Link } from "react-router-dom";
import { filterData } from "utils";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ColumnsDropDown from "./ColumnsDropDown";
import LeftMenuBar from "./LeftMenuBar";
import Table from "./Table";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [articleFilters, setArticleFilters] = useState({});
  const [filteredArticleList, setFilteredArticleList] = useState([]);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch();
      setArticleList(articles);
      setFilteredArticleList(articles);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
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

  useEffect(() => {
    setFilteredArticleList(filterData(articleList, articleFilters));
  }, [articleFilters]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <LeftMenuBar
        showMenu
        article={articleList}
        articleFilters={articleFilters}
        category={categoryList}
        setArticleFilters={setArticleFilters}
      />
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
        <Table data={filteredArticleList} />
      </Container>
    </div>
  );
};

export default Dashboard;
