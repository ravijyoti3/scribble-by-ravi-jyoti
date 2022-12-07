import React from "react";

import { Typography, Button } from "neetoui";
import { formatCreatedTimeToDateAndTime } from "utils";

const CurrentVersion = ({ article }) => (
  <div className="border mt-2 grid grid-flow-row grid-cols-3 items-center rounded-lg border-indigo-400 bg-indigo-100 p-3">
    <div className="col-span-2">
      <Typography className=" text-gray-600" style="body3">
        {formatCreatedTimeToDateAndTime(article?.created_at)}
      </Typography>
      <Typography className=" italic text-gray-600" style="body3">
        Current Version
      </Typography>
      {article?.restored_from && (
        <Typography className=" text-gray-600" style="body3">
          (Restored from version{" "}
          {formatCreatedTimeToDateAndTime(article?.restored_from)})
        </Typography>
      )}
    </div>
    <Button
      disabled
      className="ml-5 cursor-text"
      style="link"
      label={
        article?.status === "published"
          ? "Article Published"
          : "Article Drafted"
      }
    />
  </div>
);

export default CurrentVersion;
