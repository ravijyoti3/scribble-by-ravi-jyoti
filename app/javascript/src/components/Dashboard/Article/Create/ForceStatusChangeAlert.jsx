import React from "react";

import { Alert } from "neetoui";
import { useMutation } from "react-query";

import articlesApi from "apis/admin/articles";

const ForceStatusChangeAlert = ({ values, articleId, onClose, history }) => {
  const { mutate: updateArticle } = useMutation(
    async payload =>
      await articlesApi.update({
        id: articleId,
        payload,
      }),
    {
      onSuccess: () => {
        onClose();
        history.push("/articles");
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  const handleSubmit = async () => {
    const { title, body, status } = values;
    const payload = {
      title,
      body,
      status,
      category_id: values.category.value,
      restored_from: null,
    };
    updateArticle(payload);
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
