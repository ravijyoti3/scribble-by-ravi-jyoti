import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { Switch, Route, Redirect } from "react-router-dom";

import categoriesApi from "apis/admin/categories";
import UrlNotFound from "components/Common/UrlNotFound";

import ArticleContent from "./ArticleContent";
import SideBar from "./SideBar";

import { getDefaultSlug, getSlugs } from "../utils";

const Article = () => {
  const [categories, setCategories] = useState([]);
  const [defaultSlug, setDefaultSlug] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const isValidRoute = getSlugs(categories)
    .map(slug => `/public/${slug}`)
    .includes(window.location.pathname);

  const fetchCategories = async () => {
    try {
      const { data } = await categoriesApi.fetch();
      setCategories(data.categories);
      setDefaultSlug(getDefaultSlug(data.categories));
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      {isValidRoute && <SideBar categories={categories} />}
      <div className="mt-5 w-3/4 px-5">
        <Switch>
          {getSlugs(categories).map(slug => (
            <Route key={slug} path={`/public/${slug}`}>
              <ArticleContent />
            </Route>
          ))}
          <Redirect exact from="/public" to={`/public/${defaultSlug}`} />
          <Route path="*">
            <UrlNotFound entity="Article" link="/public" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Article;
