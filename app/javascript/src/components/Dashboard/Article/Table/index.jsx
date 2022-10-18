import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildTableColumnData } from "./columnData";

const Table = ({ data, visibleColumns }) => (
  <NeetoUITable
    columnData={buildTableColumnData(visibleColumns)}
    rowData={data}
  />
);

export default Table;
