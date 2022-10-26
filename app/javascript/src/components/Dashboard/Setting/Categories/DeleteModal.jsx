import React, { useState } from "react";

import { Warning } from "neetoicons";
import { Modal, Button, Typography, Callout, Select } from "neetoui";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

const DeleteModal = ({
  category,
  showDeleteModal,
  setShowDeleteModal,
  refetch,
  categoryList,
}) => {
  const [moveArticlesToCategory, setMoveArticlesToCategory] = useState({});

  const handleSubmit = async id => {
    setShowDeleteModal(false);
    try {
      if (categoryList.length > 1) {
        await articlesApi.bulkUpdate({
          category_id: id,
          new_category_id: moveArticlesToCategory.value,
        });
      } else if (category.name !== "General") {
        await categoriesApi.create({
          name: "General",
        });
        const {
          data: { categories },
        } = await categoriesApi.fetch();
        await articlesApi.bulkUpdate({
          category_id: id,
          new_category_id: categories[1].id,
        });
      }
      await categoriesApi.destroy(id);
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
      <Modal.Header>
        <Typography style="h2">Delete Category</Typography>
      </Modal.Header>
      {category.articles.length === 0 && (
        <Modal.Body className="space-y-2">
          <Typography className="mt-2" lineHeight="normal" style="body2">
            <strong>{category.name}</strong> has no articles. Are you sure you
            want to delete it? This action cannot be undone.
          </Typography>
        </Modal.Body>
      )}
      {category.articles.length > 0 &&
        categoryList.length === 1 &&
        category.name === "General" && (
          <Modal.Body className="space-y-2">
            <Typography className="mt-2" lineHeight="normal" style="body2">
              You are deleting the <strong>General category,</strong> this
              has&nbsp;{category.articles.length} articles. Deleting this will
              delete all associated articles.
            </Typography>
          </Modal.Body>
        )}
      {category.articles.length > 0 && (
        <Modal.Body className="space-y-2">
          {category.name !== "General" && (
            <Typography className="mt-2" lineHeight="normal" style="body2">
              You are permanently deleting the {category.name} category. This
              action cannot be undone. Are you sure you wish to continue?
            </Typography>
          )}
          {categoryList.length > 1 && (
            <Callout icon={Warning} style="danger">
              <div>
                Category <strong>{category.name}</strong> has&nbsp;
                <strong>
                  {category.articles.length}
                  {category.articles.length > 1 ? " articles" : " article"}
                </strong>
                . Before this category can be deleted these articles needs to be
                moved to another category.
              </div>
            </Callout>
          )}
          {categoryList.length === 1 && category.name !== "General" && (
            <Callout icon={Warning} style="danger">
              <div>
                Category <strong>{category.name}</strong> has&nbsp;
                <strong>
                  {category.articles.length}
                  {category.articles.length > 1 ? " articles" : " article"}
                </strong>
                . This will be moved to category general. Click proceed to
                continue.
              </div>
            </Callout>
          )}
          {categoryList.length > 1 && (
            <Select
              required
              label="Select a category to move these articles into"
              name="category"
              placeholder="Select Category"
              strategy="fixed"
              options={categoryList
                .filter(categoryItem => categoryItem.id !== category.id)
                .map(category => ({
                  label: category.name,
                  value: category.id,
                }))}
              onChange={e => setMoveArticlesToCategory(e)}
            />
          )}
          {!moveArticlesToCategory.value && categoryList.length > 1 && (
            <Typography className="neeto-ui-text-error-500" style="body2">
              Please Select a Category
            </Typography>
          )}
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button
          label="Proceed"
          style="danger"
          disabled={
            moveArticlesToCategory.value === undefined &&
            categoryList.length > 1 &&
            category.articles.length > 0 &&
            category.name !== "General"
          }
          onClick={() => {
            setShowDeleteModal(false);
            handleSubmit(category.id);
          }}
        />
        <Button
          label="Cancel"
          style="text"
          onClick={() => setShowDeleteModal(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
