import React, { useEffect } from "react";

import { Modal, Typography, Button, Input, Textarea } from "neetoui";
import { assoc } from "ramda";
import { useMutation, useQuery } from "react-query";

import articlesApi from "apis/admin/articles";
import categoriesApi from "apis/admin/categories";

const VersionDetailModal = ({
  refetch,
  versionArticleData,
  setShowVersionModal,
}) => {
  const { data: category, refetch: fetchCategory } = useQuery(
    "fetchCategoryName",
    async () => {
      const { data } = await categoriesApi.show(versionArticleData.category_id);

      return data.name;
    },
    {
      onError: error => logger.error(error),
    }
  );

  const { mutate: restoreVersion } = useMutation(
    async () => {
      const payload = assoc("status", 0, versionArticleData);

      return await articlesApi.update({
        id: versionArticleData.id,
        payload,
      });
    },
    {
      onSuccess: () => refetch(),
      onError: error => logger.error(error),
    }
  );

  useEffect(() => {
    fetchCategory();
  }, [versionArticleData]);

  return (
    <Modal isOpen size="large" onClose={() => setShowVersionModal(false)}>
      <Modal.Header>
        <Typography style="h2">Version History</Typography>
        <Typography className="font-gray-600" style="body2">
          Version history of Setting up an account in Scribble.
        </Typography>
      </Modal.Header>
      <Modal.Body className="mb-5">
        <>
          <div className="mb-4 flex items-center gap-4">
            <Input
              disabled
              label="Article Title"
              value={versionArticleData?.title}
            />
            <Input
              disabled
              label="Category"
              value={category || "Category has been deleted"}
            />
          </div>
          <Textarea
            disabled
            label="Article Content"
            rows={8}
            value={versionArticleData?.body}
          />
        </>
      </Modal.Body>
      <Modal.Footer>
        <Typography className="mb-2 text-red-600" style="body2">
          *Resotring the version will remove scheduled publish/unpublish.
        </Typography>
        <Button
          disabled={!category}
          label="Restore Version"
          onClick={() => {
            restoreVersion();
            setShowVersionModal(false);
          }}
        />
        <Button
          label="Cancel"
          style="text"
          onClick={() => setShowVersionModal(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default VersionDetailModal;
