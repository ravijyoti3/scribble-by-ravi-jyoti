import React, { useState, useEffect } from "react";

import { Warning } from "neetoicons";
import { Modal, Typography, Button, Callout, Select } from "neetoui";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  category,
  categoryList,
  refetch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState({});

  const fetchCategoryDetails = async () => {
    try {
      const { data } = await categoriesApi.show(category.id);
      setCategoryData(data.category);
    } catch (error) {
      logger.error(error);
    }
  };

  const dropdownCategories = categoryList
    .filter(e => e.id !== category.id)
    .map(e => ({ label: e.name, value: e.id }));

  const deleteButtonDisabled =
    !selectedCategory &&
    categoryData.article_count > 0 &&
    dropdownCategories.length > 0;

  const handleDelete = async () => {
    const newCategoryId = selectedCategory?.value || "";
    const payload = {
      category_id: category.id,
      new_category_id: newCategoryId,
    };
    try {
      if (!newCategoryId && categoryList.length === 1) {
        await categoriesApi.update({
          name: "General",
          id: category.id,
        });
      } else {
        await articlesApi.bulk_update(payload);
        await categoriesApi.destroy(category.id);
      }
      refetch();
      setShowDeleteModal(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, [fetchCategoryDetails]);

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="w-1/2 space-y-8">
          <div className="flex flex-row items-center justify-start space-x-6">
            <Button
              label="Show Modal"
              onClick={() => setShowDeleteModal(true)}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>
          <Typography id="dialog1Title" style="h2">
            Delete Category
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Typography lineHeight="normal" style="body2">
            You are permanently deleting the{" "}
            <span className="font-bold">{category.name}</span> category. This
            action cannot be undone. Are you sure you wish to continue?
          </Typography>
          <Callout icon={Warning} style="danger">
            Category {category.name} has {categoryData.article_count} articles.
            {dropdownCategories.length > 0
              ? ` Before this category can be deleted, these articles needs to be
            moved to another category.`
              : ` All articles under this category will be moved to a new category called General`}
          </Callout>
        </Modal.Body>
        <Modal.Footer className="space-x-2">
          {categoryData.article_count > 0 && dropdownCategories.length > 0 && (
            <Select
              isClearable
              isSearchable
              className="mb-4"
              label="Select a category to move these articles into"
              name="ValueList"
              options={dropdownCategories}
              placeholder="Select an Option"
              onChange={e => setSelectedCategory(e)}
            />
          )}
          <Button
            disabled={deleteButtonDisabled}
            label="Proceed"
            style="danger"
            onClick={() => handleDelete()}
          />
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowDeleteModal(false)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModal;
