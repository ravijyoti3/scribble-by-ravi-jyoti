import React from "react";

import { Table as NeetoUITable, Typography, Pagination } from "neetoui";

import { buildTableColumnData } from "./columnData";

const Table = ({
  data,
  visibleColumns,
  setShowDeleteAlert,
  setArticle,
  history,
  setCurrentPageNumber,
  totalCount,
  currentPageNumber,
}) => (
  <>
    <Typography className="mb-5" style="h3">
      {data.length} {data.length > 1 ? "Articles" : "Article"}
    </Typography>
    <NeetoUITable
      allowRowClick={false}
      defaultPageSize={10}
      rowData={data}
      columnData={buildTableColumnData(
        visibleColumns,
        setShowDeleteAlert,
        setArticle,
        history
      )}
      onPageChange={setCurrentPageNumber}
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
  </>
);

export default Table;
