import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import articlesApi from "apis/admin/articles";
import categoriesApi from "apis/admin/categories";

import ActionBlock from "./ActionBlock";
import { TABLE_COLUMNS } from "./constants";
import DeleteAlert from "./DeleteAlert";
import SideMenuBar from "./SideMenuBar";
import Table from "./Table";

const Dashboard = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articleFilters, setArticleFilters] = useState({
    status: "",
    categoryIds: [],
  });
  const [visibleColumns, setVisibleColumns] = useState(TABLE_COLUMNS);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [article, setArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [articleCount, setArticleCount] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const fetchArticles = async () => {
    try {
      const payload = {
        categories: articleFilters.categoryIds,
        status: articleFilters.status,
        search: searchQuery,
        pageNumber: currentPageNumber,
      };
      const { data } = await articlesApi.fetch(payload);
      setArticles(data.articles);
      setArticleCount({
        all: data.total_count,
        published: data.published_count,
        draft: data.draft_count,
      });
      if (
        articleFilters.status === "" &&
        articleFilters.categoryIds.length === 0
      ) {
        setArticles(data.articles);
      }
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
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticlesCategories = async () => {
    await Promise.all([fetchArticles(), fetchCategories()]);
    setPageLoading(false);
  };

  useEffect(() => {
    fetchArticlesCategories();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [articleFilters, searchQuery, currentPageNumber]);

  if (pageLoading) {
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
        articleCount={articleCount}
        articleFilters={articleFilters}
        articles={articles}
        categories={categories}
        refetch={fetchCategories}
        setArticleFilters={setArticleFilters}
        setCurrentPageNumber={setCurrentPageNumber}
      />
      <Container>
        <Header
          actionBlock={
            <ActionBlock
              categories={categories}
              setVisibleColumns={setVisibleColumns}
              visibleColumns={visibleColumns}
            />
          }
          searchProps={{
            placeholder: "Search article title",
            value: searchQuery,
            onChange: e => {
              setSearchQuery(e.target.value);
              setCurrentPageNumber(1);
            },
          }}
        />
        {!loading && (
          <Table
            currentPageNumber={currentPageNumber}
            data={articles}
            history={history}
            setArticle={setArticle}
            setCurrentPageNumber={setCurrentPageNumber}
            setShowDeleteAlert={setShowDeleteAlert}
            totalCount={articleCount.all}
            visibleColumns={visibleColumns}
          />
        )}
        {loading && <PageLoader />}
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
