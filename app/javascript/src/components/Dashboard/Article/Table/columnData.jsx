import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";
import { formatCreatedTimeToDate } from "utils";

const renderText = value => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {value}
  </Typography>
);

export const buildTableColumnData = visibleColumns =>
  [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "10%",

      render: title => (
        <Typography className="font-semibold text-indigo-500" style="body2">
          {title}
        </Typography>
      ),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",

      render: (created_at, tableRow) => (
        <div className="font-semibold">
          {tableRow.status === "published"
            ? formatCreatedTimeToDate(created_at)
            : "--------"}
        </div>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "10%",

      render: renderText,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "10%",

      render: category => renderText(category.name),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",

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
  ].filter(column => visibleColumns.includes(column.title));
