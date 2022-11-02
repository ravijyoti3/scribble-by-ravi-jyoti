import React, { useEffect, useState } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import categoriesApi from "apis/categories";

import ArticleContent from "./ArticleContent";
import ArticleNotFound from "./ArticleNotFound";
import SideBar from "./SideBar";

const Article = () => {
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

  const fetchArticlesCategories = () => {
    fetchCategories();
  };

  useEffect(() => {
    fetchArticlesCategories();
  }, []);

  return (
    <div className="flex">
      <SideBar categories={categories} />
      <div className="mt-5 w-3/4 px-5">
        <Switch>
          {categories
            .map(category => category.articles)
            .flat(1)
            .map(article => (
              <Route key={article.slug} path={`/public/${article.slug}`}>
                <ArticleContent />
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
