import React from "react";

import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import { formatCreatedTimeToDate } from "utils";

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
    width: "16%",

    render: (title, { status, slug }) =>
      status === "published" ? (
        <Link target="_blank" to={`/public/${slug}`}>
          <Typography className="text-indigo-500" style="h5">
            {title}
          </Typography>
        </Link>
      ) : (
        <Typography style="h5">{title}</Typography>
      ),
  },
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    width: "16%",

    render: created_at => (
      <div className="font-semibold">{formatCreatedTimeToDate(created_at)}</div>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: "16%",

    render: category => renderText(category.name),
  },
  {
    title: "Visits",
    dataIndex: "visit",
    key: "visit",
    width: "16%",
    render: renderText,
  },
];
