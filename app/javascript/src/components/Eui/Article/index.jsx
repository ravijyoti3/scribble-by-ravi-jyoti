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
  const [defaultArticle, setDefaultArticle] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await categoriesApi.fetch();
      setCategories(data.categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticles = async () => {
    try {
      const { data } = await articlesApi.fetch();
      const filteredArticles = data.articles.filter(
        article => article.status === "published"
      );
      setArticles(filteredArticles);
      setDefaultArticle(filteredArticles[0].slug);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  return (
    <div className="flex">
      <SideBar articles={articles} categories={categories} />
      <div className="mt-5 w-3/4 px-5">
        <Switch>
          {articles.map(article => (
            <Route key={article.id} path={`/public/${article.slug}`}>
              <ArticleContent article={article} />
            </Route>
          ))}
          <Redirect exact from="/public" to={`/public/${defaultArticle}`} />
          <Route component={ArticleNotFound} path="*" />
        </Switch>
      </div>
    </div>
  );
};

export default Article;
