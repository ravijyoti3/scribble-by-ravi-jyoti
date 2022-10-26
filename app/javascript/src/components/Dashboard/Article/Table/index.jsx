import React from "react";

import { Table as NeetoUITable, Typography } from "neetoui";

import { buildTableColumnData } from "./columnData";

const Table = ({
  data,
  visibleColumns,
  setShowDeleteAlert,
  setArticle,
  history,
}) => (
  <>
    <Typography className="mb-5" style="h3">
      {data.length} {data.length > 1 ? "Articles" : "Article"}
    </Typography>
    <NeetoUITable
      allowRowClick={false}
      rowData={data}
      columnData={buildTableColumnData(
        visibleColumns,
        setShowDeleteAlert,
        setArticle,
        history
      )}
    />
  </>
);

export default Table;
