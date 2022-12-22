import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { Container, Header } from "neetoui/layouts";
import { useQuery } from "react-query";

import articlesApi from "apis/admin/articles";
import categoriesApi from "apis/admin/categories";

import ActionBlock from "./ActionBlock";
import { TABLE_COLUMNS } from "./constants";
import DeleteAlert from "./DeleteAlert";
import SideMenuBar from "./SideMenuBar";
import Table from "./Table";

const Dashboard = ({ history }) => {
  const [articleFilters, setArticleFilters] = useState({
    status: "",
    categoryIds: [],
  });
  const [visibleColumns, setVisibleColumns] = useState(TABLE_COLUMNS);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [article, setArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [articleCount, setArticleCount] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const payload = {
    categories: articleFilters.categoryIds,
    status: articleFilters.status,
    search: searchQuery,
    pageNumber: currentPageNumber,
  };

  const fetchArticle = async () => {
    const { data } = await articlesApi.fetch(payload);
    setArticleCount({
      all: data.total_count,
      published: data.published_count,
      draft: data.draft_count,
    });

    return data.articles;
  };

  const fetchCategories = async () => {
    const { data } = await categoriesApi.fetch();

    return data.categories;
  };

  const {
    data: articles,
    isLoading: isLoadingArticles,
    refetch: refetchArticles,
  } = useQuery("articles", fetchArticle);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = useQuery("fetchCategories", fetchCategories);

  const isLoading = isLoadingArticles || isLoadingCategories;

  useEffect(() => {
    refetchArticles();
  }, [articleFilters, searchQuery, currentPageNumber]);

  if (isLoading) {
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
        refetch={refetchCategories}
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
        {!isLoading && (
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
        {isLoading && <PageLoader />}
        <DeleteAlert
          article={article}
          refetch={refetchArticles}
          setShowDeleteAlert={setShowDeleteAlert}
          showDeleteAlert={showDeleteAlert}
        />
      </Container>
    </div>
  );
};

export default Dashboard;
