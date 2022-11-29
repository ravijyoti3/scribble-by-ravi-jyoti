import React from "react";

import { Modal, Typography, Button, Input, Textarea } from "neetoui";

const VersionDetailModal = ({ article, setShowVersionModal }) => (
  <Modal isOpen size="large" onClose={() => setShowVersionModal(false)}>
    <Modal.Header>
      <Typography style="h2">Version History</Typography>
      <Typography className="font-gray-600" style="body2">
        Version history of Setting up an account in Scribble.
      </Typography>
    </Modal.Header>
    <Modal.Body className="mb-5">
      <div>
        <div className="mb-4 flex items-center gap-4">
          <Input
            disabled
            label="Article Title"
            name="title"
            value={article?.title}
          />
          <Input
            disabled
            label="Category"
            name="category"
            value={article?.category?.label}
          />
        </div>
        <Textarea
          disabled
          label="Article Content"
          name="body"
          rows={11}
          value={article?.body}
        />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button
        label="Restore Version"
        onClick={() => setShowVersionModal(false)}
      />
      <Button
        label="Cancel"
        style="text"
        onClick={() => setShowVersionModal(false)}
      />
    </Modal.Footer>
  </Modal>
);

export default VersionDetailModal;
