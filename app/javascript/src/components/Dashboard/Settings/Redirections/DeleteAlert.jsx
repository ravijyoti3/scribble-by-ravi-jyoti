import React from "react";

import { Modal, Button, Typography } from "neetoui";

import redirectionsApi from "apis/admin/redirections";

const DeleteAlert = ({ id, showDeleteAlert, setShowDeleteAlert, refetch }) => {
  const deleteRedirection = async () => {
    try {
      await redirectionsApi.destroy(id);
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
            Delete Redirection
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Typography lineHeight="normal" style="body2">
            Are you sure you want to delete the redirection? This action cannot
            be undone.
          </Typography>
        </Modal.Body>
        <Modal.Footer className="space-x-2">
          <Button label="Continue" style="danger" onClick={deleteRedirection} />
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
