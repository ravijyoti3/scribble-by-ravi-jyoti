import React, { useEffect, useState } from "react";

import { Table as NeetouiTable, PageLoader } from "neetoui";

import articlesApi from "apis/admin/articles";

import { buildTableColumnData } from "./columnData";

const Analytics = () => {
  const [articleData, setArticleData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch({ status: "published" });
      setArticleData(articles);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-5 w-4/5">
      <NeetouiTable
        allowRowClick={false}
        columnData={buildTableColumnData()}
        currentPageNumber={currentPage}
        defaultPageSize={10}
        handlePageChange={setCurrentPage}
        rowData={articleData}
      />
    </div>
  );
};

export default Analytics;
