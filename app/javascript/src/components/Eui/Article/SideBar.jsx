import React from "react";

import { Accordion } from "neetoui";
import { NavLink } from "react-router-dom";

const SideBar = ({ categories, articles }) => {
  const pathName = window.location.pathname.split("/")[2];

  const findCategory = () => {
    let category_id = null;
    let position = 0;
    articles.forEach(article => {
      if (
        (article.slug && article.slug === pathName) ||
        article.id === pathName
      ) {
        category_id = article.category_id;
      }
    });

    categories.forEach((category, index) => {
      if (category.id === category_id) {
        position = index;
      }
    });

    return position;
  };

  return (
    <Accordion
      className="border-r h-full w-1/4 px-5"
      defaultActiveKey={findCategory()}
      iconPosition="end"
    >
      {categories.map(item => (
        <Accordion.Item key={item.id} title={item.name}>
          {articles
            .filter(e => e.category_id === item.id)
            .map(article => (
              <div className="mb-2" key={article.slug}>
                <NavLink
                  activeClassName="text-indigo-600 font-medium"
                  className="font-medium text-gray-500"
                  to={
                    article.slug
                      ? `/public/${article.slug}`
                      : `/public/${article.id}`
                  }
                >
                  {article.title}
                </NavLink>
              </div>
            ))}
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default SideBar;
