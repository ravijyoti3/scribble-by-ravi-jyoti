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

  const fetchArticles = async () => {
    try {
      const payload = {
        categories: articleFilters.categoryIds.join(","),
        status: articleFilters.status,
        search: searchQuery,
      };
      const {
        data: { articles },
      } = await articlesApi.fetch(payload);
      setArticles(articles);
      if (
        articleFilters.status === "" &&
        articleFilters.categoryIds.length === 0
      ) {
        setArticles(articles);
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
  }, [articleFilters, searchQuery]);

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
        articleFilters={articleFilters}
        articles={articles}
        categories={categories}
        refetch={fetchCategories}
        setArticleFilters={setArticleFilters}
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
            onChange: e => setSearchQuery(e.target.value),
          }}
        />
        {!loading && (
          <Table
            data={articles}
            history={history}
            setArticle={setArticle}
            setShowDeleteAlert={setShowDeleteAlert}
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
