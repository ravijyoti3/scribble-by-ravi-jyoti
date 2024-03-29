import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Link } from "react-router-dom";
import { formatCreatedTimeToDate } from "utils";

const renderText = value => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {value}
  </Typography>
);

export const buildTableColumnData = (
  visibleColumns,
  setShowDeleteAlert,
  setArticle
) =>
  [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "16%",

      render: (title, { status, slug }) =>
        status === "published" ? (
          <Link target="_blank" to={`/public/${slug}`}>
            <Typography className="truncate text-indigo-500" style="h5">
              {title}
            </Typography>
          </Link>
        ) : (
          <Typography style="h5">{title}</Typography>
        ),
    },
    {
      title: "Last Published At",
      dataIndex: "created_at",
      key: "created_at",
      width: "16%",

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
      width: "16%",

      render: author => renderText(author.name),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "16%",

      render: category => renderText(category.name),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "16%",

      render: renderText,
    },
    {
      title: "",
      dataIndex: "more",
      key: "more",
      width: "16%",
      render: (_, article) => (
        <div className="flex">
          <Button
            icon={Delete}
            style="text"
            onClick={() => {
              setArticle(article);
              setShowDeleteAlert(true);
            }}
          />
          <Link to={`/articles/${article.id}/edit`}>
            <Button icon={Edit} style="text" />
          </Link>
        </div>
      ),
    },
  ].filter(column => visibleColumns.includes(column.title));
