import React, { useState } from "react";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Modal, Typography, Button } from "neetoui";
import { formatScheduledTime } from "utils";

import schedulesApi from "apis/admin/schedules";

const ScheduleArticleModal = ({
  onClose,
  article,
  scheduleAction,
  refetch,
}) => {
  const [scheduleTime, setScheduleTime] = useState(null);

  const handleSubmit = async () => {
    const articleId = article.id;
    let payload;
    if (scheduleAction === "Publish Later") {
      payload = {
        articleId,
        publishAt: formatScheduledTime(scheduleTime),
      };
    } else if (scheduleAction === "Unpublish Later") {
      payload = {
        articleId,
        unpublishAt: formatScheduledTime(scheduleTime),
      };
    } else {
      payload = {
        articleId,
        publishAt:
          scheduleAction === "Publish Later" &&
          formatScheduledTime(scheduleTime),
        unpublishAt:
          scheduleAction === "Unpublish Later" &&
          formatScheduledTime(scheduleTime),
      };
    }

    try {
      if (article.schedule) {
        await schedulesApi.update(payload);
      } else {
        await schedulesApi.create(payload);
      }
      onClose();
      refetch();
    } catch (err) {
      logger.error(err);
    }
  };

  const disabledDate = current => current < dayjs().startOf("day");

  return (
    <Modal isOpen className="pb-5" onClose={onClose}>
      <Modal.Header>
        <Typography style="h2">Schedule {scheduleAction}</Typography>
      </Modal.Header>
      <Modal.Body className="space-y-6">
        <div>
          <Typography>Date</Typography>
          <DatePicker
            showTime
            className="w-full"
            disabledDate={disabledDate}
            format="YYYY-MM-DD HH:mm"
            value={scheduleTime}
            onChange={setScheduleTime}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button label="Confirm" onClick={handleSubmit} />
        <Button label="Cancel" style="text" onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default ScheduleArticleModal;
