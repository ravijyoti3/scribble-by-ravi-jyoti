import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildTableColumnData } from "./columnData";

const Table = ({ data, visibleColumns, setShowDeleteAlert, setArticle }) => (
  <NeetoUITable
    rowData={data}
    columnData={buildTableColumnData(
      visibleColumns,
      setShowDeleteAlert,
      setArticle
    )}
  />
);

export default Table;
