import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildTableColumnData } from "./columnData";

import { ROW_DATA } from "../constants";

const index = () => (
  <NeetoUITable columnData={buildTableColumnData()} rowData={ROW_DATA} />
);

export default index;
