import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { useMutation } from "react-query";

import categoriesApi from "apis/admin/categories";

import ArticleColumn from "./ArticleColumn";
import CategoryColumn from "./CategoryColumn";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  const { mutate: fetchCategories, isLoading } = useMutation(
    async () => {
      const { data } = await categoriesApi.fetch();

      return data.categories;
    },
    {
      onSuccess: categories => {
        setCategoryList(categories);
        if (!activeCategory) setActiveCategory(categories[0]);
      },
      onError: error => logger.error(error),
    }
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

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
