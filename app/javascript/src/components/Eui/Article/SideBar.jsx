import React from "react";

import { Accordion, Typography } from "neetoui";
import { NavLink } from "react-router-dom";

const SideBar = ({ categories }) => {
  const pathName = window.location.pathname.split("/")[2];

  const findCategory = () =>
    categories
      .map(category => category.id)
      .indexOf(
        categories.find(category =>
          category.articles.map(article => article.slug).includes(pathName)
        )?.id
      ) || 0;

  return (
    <div className="w-1/4">
      <Accordion
        className="border-r h-full px-5"
        defaultActiveKey={findCategory()}
        iconPosition="end"
      >
        {categories.map(category => {
          const publishedArticles = category.articles.filter(
            article => article.status === "published"
          );

          return (
            <Accordion.Item key={category.id} title={category.name}>
              {publishedArticles.length === 0 ? (
                <Typography className="neeto-ui-text-gray-400" style="h4">
                  No Articles
                </Typography>
              ) : (
                publishedArticles.map(article => (
                  <div className="mb-2" key={article.slug}>
                    <NavLink
                      activeClassName="text-indigo-600 font-medium"
                      className="font-medium text-gray-500"
                      to={`/public/${article.slug}`}
                    >
                      {article.title}
                    </NavLink>
                  </div>
                ))
              )}
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SideBar;
