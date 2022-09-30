import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";

const renderText = value => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {value}
  </Typography>
);

export const buildTableColumnData = () => [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: title => (
      <Typography className="font-semibold text-indigo-500" style="body2">
        {title}
      </Typography>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    render: renderText,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: renderText,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: renderText,
  },
  {
    title: "",
    dataIndex: "more",
    key: "more",
    width: "10%",
    render: () => (
      <div className="flex">
        <Button icon={Delete} style="text" />
        <Button icon={Edit} style="text" />
      </div>
    ),
  },
];
