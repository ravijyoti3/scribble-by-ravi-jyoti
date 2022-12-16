import React from "react";

import { Alert } from "neetoui";

import articlesApi from "apis/admin/articles";
import schedulesApi from "apis/admin/schedules";

const ForceStatusChangeAlert = ({ values, articleId, onClose, history }) => {
  const handleSubmit = async () => {
    const { title, body, status } = values;
    const payload = {
      title,
      body,
      status,
      category_id: values.category.value,
      restored_from: null,
    };

    try {
      await schedulesApi.update({
        articleId,
        publishAt: null,
        unpublishAt: null,
      });
      await articlesApi.update({
        id: articleId,
        payload,
      });
      onClose();
      history.push("/articles");
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Alert
      isOpen={open}
      message="Changing the status will discard the article's schedule for publish/unpublish."
      title="Do you want to continue?"
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default ForceStatusChangeAlert;
