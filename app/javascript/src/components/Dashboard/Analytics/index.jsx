import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { Table as NeetouiTable, PageLoader } from "neetoui";
import { formatVisitedTimeToDate } from "utils";

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
        expandable={{
          rowExpandable: record => record.visits.length > 0,
          expandedRowRender: record => (
            <>
              <div className="flex w-56 items-center bg-white p-2">
                <Typography className="w-1/2" style="h6">
                  DATE
                </Typography>
                <Typography className="w-1/2" style="h6">
                  VISITS
                </Typography>
              </div>
              {record.visits.map(visit => (
                <div className="items-cente flex w-56 p-2" key={visit.id}>
                  <Typography className="w-1/2" style="body3">
                    {formatVisitedTimeToDate(visit.visited_at)}
                  </Typography>
                  <Typography className="w-1/2" style="body3">
                    {visit.visit}
                  </Typography>
                </div>
              ))}
            </>
          ),
        }}
      />
    </div>
  );
};

export default Analytics;
