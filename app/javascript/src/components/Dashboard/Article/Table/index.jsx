import React, { useState, useEffect } from "react";

import { Table as NeetoUITable } from "neetoui";

import articlesApi from "apis/articles";

import { buildTableColumnData } from "./columnData";

const Table = () => {
  const [article, setArticle] = useState([]);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch();
      setArticle(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return <NeetoUITable columnData={buildTableColumnData()} rowData={article} />;
};

export default Table;
