import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { MenuVertical } from "neetoicons";
import { Dropdown } from "neetoui";
import { Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/admin/categories";
import { useKey } from "hooks/useKey";

import DeleteModal from "./DeleteModal";
import Form from "./Form";

const List = ({ category, index, refetch, categoryList, setCategoryList }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { MenuItem } = Dropdown;

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
      <Draggable draggableId={category.id} index={index} key={category.id}>
        {provided => (
          <div
            className="mb-2 flex items-center justify-between"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {!isEdit ? (
              <div className="flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-200">
                <div>
                  <Typography style="h4">{category.name}</Typography>
                  <Typography style="body3">{category.name}</Typography>
                </div>
                <Dropdown
                  buttonSize="small"
                  buttonStyle="text"
                  icon={MenuVertical}
                >
                  <MenuItem.Button>Edit</MenuItem.Button>
                  <MenuItem.Button style="danger">Delete</MenuItem.Button>
                </Dropdown>
              </div>
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
