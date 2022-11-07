import React from "react";

import { Modal, Button, Typography } from "neetoui";

import articlesApi from "apis/admin/articles";

const DeleteAlert = ({
  article,
  showDeleteAlert,
  setShowDeleteAlert,
  refetch,
}) => {
  const deleteArticle = async () => {
    try {
      await articlesApi.destroy(article.id);
      refetch();
      setShowDeleteAlert(false);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="w-full">
      <Modal isOpen={showDeleteAlert} onClose={() => setShowDeleteAlert(false)}>
        <Modal.Header>
          <Typography id="dialog1Title" style="h2">
            Delete Article
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Typography lineHeight="normal" style="body2">
            Are you sure you want to delete the article{" "}
            <span className="font-bold">{article?.title}</span> ? This action
            cannot be undone.
          </Typography>
        </Modal.Body>
        <Modal.Footer className="space-x-2">
          <Button label="Continue" style="danger" onClick={deleteArticle} />
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowDeleteAlert(false)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteAlert;
