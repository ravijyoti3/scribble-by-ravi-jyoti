import React, { useEffect, useState } from "react";

import categoriesApi from "apis/admin/categories";

import ArticleColumn from "./ArticleColumn";
import CategoryColumn from "./CategoryColumn";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategoryList(categories);
      if (!activeCategory) setActiveCategory(categories[0]);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="grid w-full grid-flow-row grid-cols-3 justify-center">
      <CategoryColumn
        activeCategory={activeCategory}
        categoryList={categoryList}
        refetch={fetchCategories}
        setActiveCategory={setActiveCategory}
        setCategoryList={setCategoryList}
      />
      <ArticleColumn
        activeCategory={activeCategory}
        categoryList={categoryList}
        refetch={fetchCategories}
      />
    </div>
  );
};

export default Categories;
