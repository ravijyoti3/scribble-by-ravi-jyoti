import React from "react";

import ArticlesColumn from "./ArticlesColumn";
import CategoriesColumn from "./CategoriesColumn";

const Categories = () => (
  <div className="grid w-full grid-flow-row grid-cols-3 justify-center">
    <CategoriesColumn />
    <ArticlesColumn />
  </div>
);

export default Categories;
