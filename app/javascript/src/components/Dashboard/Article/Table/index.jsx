import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildTableColumnData } from "./columnData";

const Table = ({ data }) => (
  <NeetoUITable columnData={buildTableColumnData()} rowData={data} />
);

export default Table;
