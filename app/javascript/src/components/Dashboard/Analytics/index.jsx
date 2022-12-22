import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { Table as NeetouiTable, PageLoader, Pagination } from "neetoui";
import { useMutation } from "react-query";
import { formatVisitedTimeToDate } from "utils";

import articlesApi from "apis/admin/articles";

import { buildTableColumnData } from "./columnData";

const Analytics = () => {
  const [articleData, setArticleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const { mutate: fetchArticles, isLoading } = useMutation(
    async () => {
      const { data } = await articlesApi.fetch({
        status: "published",
        pageNumber: currentPageNumber,
      });

      return data;
    },
    {
      onSuccess: data => {
        setArticleData(data.articles);
        setTotalCount(data.total_count);
      },
      onError: error => logger.error(error),
    }
  );

  useEffect(() => {
    fetchArticles();
  }, [currentPageNumber]);

  if (isLoading) {
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
      <div className="flex w-full justify-end">
        <Pagination
          className="mt-4"
          count={totalCount}
          navigate={setCurrentPageNumber}
          pageNo={currentPageNumber}
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default Analytics;
