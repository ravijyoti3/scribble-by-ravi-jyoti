import React from "react";

import { Callout, Button, Typography } from "neetoui";
import { formatCreatedTimeToDateAndTime } from "utils";

import schedulesApi from "apis/admin/schedules";

const ScheduleInfo = ({ article, refetch }) => {
  const cancelSchedule = async scheduleAction => {
    const payload = {
      articleId: article.id,
      publishAt:
        scheduleAction === "publish" ||
        (scheduleAction === "unpublish" && article.status === "published")
          ? null
          : article.schedule.publish_at,
      unpublishAt:
        scheduleAction === "unpublish" ||
        (scheduleAction === "publish" && article.status === "draft")
          ? null
          : article.schedule.unpublish_at,
    };

    try {
      await schedulesApi.update(payload);
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      {article?.schedule?.publish_at && (
        <Callout className="mb-5">
          <Typography style="body2">
            Article is scheduled to be{" "}
            <span className="font-bold">
              publish at{" "}
              {formatCreatedTimeToDateAndTime(article.schedule.publish_at)}
            </span>
          </Typography>
          <Button
            className="mr-5 ml-5"
            label="Cancel Schedule"
            style="link"
            onClick={() => cancelSchedule("publish")}
          />
        </Callout>
      )}
      {article?.schedule?.unpublish_at && (
        <Callout className="mb-5">
          <Typography style="body2">
            Article is scheduled to be{" "}
            <span className="font-bold">
              unpublish at{" "}
              {formatCreatedTimeToDateAndTime(article.schedule.unpublish_at)}
            </span>
          </Typography>
          <Button
            className="mr-5 ml-5"
            label="Cancel Schedule"
            style="link"
            onClick={() => cancelSchedule("unpublish")}
          />
        </Callout>
      )}
    </>
  );
};

export default ScheduleInfo;
