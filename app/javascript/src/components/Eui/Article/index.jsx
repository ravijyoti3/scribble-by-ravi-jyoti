import React, { useEffect, useState } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ArticleContent from "./ArticleContent";
import ArticleNotFound from "./ArticleNotFound";
import SideBar from "./SideBar";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [defaultSlug, setDefaultSlug] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await categoriesApi.fetch();
      setCategories(data.categories);
      setDefaultSlug(
        data.categories
          .filter(e => e.articles.length > 0)[0]
          .articles.filter(e => e.status === "published")[0].slug
      );
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticles = async () => {
    try {
      const { data } = await articlesApi.fetch({
        status: "published",
        categories: [],
        search: "",
      });
      setArticles(data.articles);
    } catch (err) {
      logger.error(err);
    }
  };

  const fetchArticlesCategories = () => {
    fetchCategories();
    fetchArticles();
  };

  useEffect(() => {
    fetchArticlesCategories();
  }, []);

  return (
    <div className="flex">
      <SideBar articles={articles} categories={categories} />
      <div className="mt-5 w-3/4 px-5">
        <Switch>
          {articles.map(article => (
            <Route key={article.slug} path={`/public/${article.slug}`}>
              <ArticleContent article={article} />
            </Route>
          ))}
          <Redirect exact from="/public" to={`/public/${defaultSlug}`} />
          <Route component={ArticleNotFound} path="*" />
        </Switch>
      </div>
    </div>
  );
};

export default Article;
