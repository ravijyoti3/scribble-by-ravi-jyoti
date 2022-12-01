import React, { useEffect, useState } from "react";

import { ExternalLink } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Link, NavLink, useLocation } from "react-router-dom";

import articlesApi from "apis/admin/articles";

const NavBar = () => {
  const [article, setArticle] = useState(null);
  const isEditArticleRoute = useLocation().pathname.includes("edit");

  const articleId = useLocation().pathname.split("/")[2];

  const fetchArticle = async () => {
    try {
      const { data } = await articlesApi.show(articleId);
      setArticle(data);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    if (isEditArticleRoute) {
      fetchArticle();
    }
  }, []);

  return (
    <nav className=" border-b sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-5">
      <div className="flex items-center">
        <Typography className="mr-5" style="h3">
          Scribble
        </Typography>
        <NavLink
          activeClassName="neeto-ui-text-primary-500 mx-6"
          className="neeto-ui-text-gray-500 mx-6 "
          to="/articles"
        >
          <Typography style="h4">Articles</Typography>
        </NavLink>
        <NavLink
          activeClassName="neeto-ui-text-primary-500 mx-6"
          className="neeto-ui-text-gray-500 mx-6"
          to="/settings?tab=general"
        >
          <Typography style="h4">Settings</Typography>
        </NavLink>
        <NavLink
          activeClassName="neeto-ui-text-primary-500 mx-6"
          className="neeto-ui-text-gray-500 mx-6"
          to="/analytics"
        >
          <Typography style="h4">Analytics</Typography>
        </NavLink>
      </div>
      <div className="flex items-center">
        {isEditArticleRoute && (
          <div
            className={`mr-4 rounded-md ${
              article?.status === "published" ? "bg-green-500" : "bg-yellow-200"
            } px-2`}
          >
            <Typography
              style="body2"
              className={
                article?.status === "published"
                  ? "text-white"
                  : "text-orange-400"
              }
            >
              {article?.status}
            </Typography>
          </div>
        )}
        <Link target="_blank" to="/public">
          <Button icon={ExternalLink} label="Preview" style="secondary" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
