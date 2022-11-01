import React, { useState } from "react";

import { Delete, Edit } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Draggable } from "react-beautiful-dnd";
import { useKey } from "utils";

import categoriesApi from "apis/categories";

import DeleteModal from "./DeleteModal";
import Form from "./Form";

const List = ({ category, index, refetch, categoryList, setCategoryList }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editCategory = async payload => {
    payload.id = category.id;
    try {
      await categoriesApi.update(payload);
      refetch();
      setIsEdit(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useKey("Escape", () => {
    setIsEdit(false);
  });

  return (
    <>
      <Draggable
        draggableId={category.id.toString()}
        index={index}
        key={category.id}
      >
        {provided => (
          <div
            className="mt-4 flex items-center justify-between border-t-2"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {!isEdit ? (
              <>
                <div className="flex">
                  <Typography
                    className="ri-drag-move-2-line fa-2x neeto-ui-text-gray-500 mx-2 my-px"
                    style="body1"
                  />
                  <Typography className="mt-1" style="h4">
                    {category.name}
                  </Typography>
                </div>
                <div className="mt-2">
                  <Button
                    icon={Delete}
                    style="text"
                    disabled={
                      category.name === "General" && categoryList.length === 1
                    }
                    onClick={() => setShowDeleteModal(true)}
                  />
                  <Button
                    icon={Edit}
                    style="text"
                    onClick={() => setIsEdit(true)}
                  />
                </div>
              </>
            ) : (
              <Form
                category={category}
                handleSubmit={editCategory}
                showForm={setIsEdit}
              />
            )}
          </div>
        )}
      </Draggable>
      {showDeleteModal && (
        <DeleteModal
          category={category}
          categoryList={categoryList}
          refetch={refetch}
          setCategoryList={setCategoryList}
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
        />
      )}
    </>
  );
};

export default List;
