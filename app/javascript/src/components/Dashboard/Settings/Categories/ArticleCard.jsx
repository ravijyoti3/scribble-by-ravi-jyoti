import React from "react";

import { Clock } from "neetoicons";
import { Typography, Tag, Avatar, Tooltip, Checkbox } from "neetoui";
import { Draggable } from "react-beautiful-dnd";

import { calculateCreatedAgo, calculateDateToWeekday } from "./utils";

const ArticleCard = ({ article, index }) => (
  <Draggable draggableId={article.id} index={index} key={article.id}>
    {provided => (
      <div
        className="border mb-4 w-full border-gray-300 bg-white py-3 px-4 shadow-xs hover:shadow-md"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Checkbox className="mb-2" id="checkbox_name" />
        <Typography className="mb-px leading-6" style="h4">
          {article.title}
        </Typography>
        <Typography
          className="line-clamp text-ellipsis neeto-ui-text-gray-600 leading-5"
          style="body2"
        >
          {article.body}
        </Typography>
        <hr className="my-3" />
        <div className="flex items-center justify-end gap-3">
          <div className="flex items-center">
            <Clock className="mr-1" color="#68737D" size={16} />
            <Tooltip
              content={calculateDateToWeekday(article.created_at)}
              followCursor="horizontal"
              position="bottom"
            >
              <Typography
                className="neeto-ui-text-gray-600 leading-5"
                style="body3"
              >
                Created {calculateCreatedAgo(article.created_at)}
              </Typography>
            </Tooltip>
          </div>
          <Avatar
            user={{
              name: "Oliver Smith",
            }}
          />
          <Tag
            label={article.status}
            style="body3"
            className={`capitalize ${
              article.status === "draft" ? "bg-orange-200" : "bg-indigo-200"
            }`}
          />
        </div>
      </div>
    )}
  </Draggable>
);

export default ArticleCard;
