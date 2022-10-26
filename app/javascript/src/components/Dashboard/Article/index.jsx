import React, { useEffect, useState } from "react";

import { Button, PageLoader } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import TooltipWrapper from "components/Common/TooltipWrapper";

import ColumnsDropDown from "./ColumnsDropDown";
import { TABLE_COLUMNS } from "./constants";
import DeleteAlert from "./DeleteAlert";
import SideMenuBar from "./SideMenuBar";
import Table from "./Table";
import { searchArticle, dataIntersection, filterData } from "./utils";

const Dashboard = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [articleFilters, setArticleFilters] = useState({
    status: null,
    category_id: [],
  });
  const [filteredArticleList, setFilteredArticleList] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(TABLE_COLUMNS);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [article, setArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const fetchArticlesCategories = () => {
    fetchArticles();
    fetchCategories();
  };

  useEffect(() => {
    fetchArticlesCategories();
  }, []);

  useEffect(() => {
    setFilteredArticleList(
      dataIntersection(
        filterData(articleList, articleFilters),
        searchArticle(articleList, searchQuery)
      )
    );
  }, [articleFilters, searchQuery]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <SideMenuBar
        showMenu
        articleFilters={articleFilters}
        articles={articleList}
        categories={categoryList}
        refetch={fetchCategories}
        setArticleFilters={setArticleFilters}
      />
      <Container>
        <Header
          actionBlock={
            <div className="flex items-center justify-between">
              <ColumnsDropDown
                setVisibleColumns={setVisibleColumns}
                visibleColumns={visibleColumns}
              />
              <TooltipWrapper
                content="Add category to create an article"
                disabled={categoryList.length === 0}
                followCursor="horizontal"
                position="bottom"
              >
                <Button
                  className="mx-2"
                  disabled={categoryList.length === 0}
                  label="Add New Article"
                  to={categoryList.length > 0 ? "/articles/create" : "/"}
                />
              </TooltipWrapper>
            </div>
          }
          searchProps={{
            placeholder: "Search article title",
            value: searchQuery,
            onChange: e => setSearchQuery(e.target.value),
          }}
        />
        <Table
          data={filteredArticleList}
          history={history}
          setArticle={setArticle}
          setShowDeleteAlert={setShowDeleteAlert}
          visibleColumns={visibleColumns}
        />
        <DeleteAlert
          article={article}
          refetch={fetchArticles}
          setShowDeleteAlert={setShowDeleteAlert}
          showDeleteAlert={showDeleteAlert}
        />
      </Container>
    </div>
  );
};

export default Dashboard;
