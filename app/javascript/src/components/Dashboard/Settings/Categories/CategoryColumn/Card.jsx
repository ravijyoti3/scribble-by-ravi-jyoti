import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { MenuVertical } from "neetoicons";
import { Dropdown } from "neetoui";
import { Draggable } from "react-beautiful-dnd";
import { useMutation } from "react-query";

import categoriesApi from "apis/admin/categories";

import DeleteModal from "./DeleteModal";

import Form from "../Form";

const CategoryCard = ({
  category,
  index,
  refetch,
  categoryList,
  active,
  setActiveCategory,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { MenuItem } = Dropdown;
  const { id, name, articles } = category;

  const { mutate: editCategory } = useMutation(
    async category => await categoriesApi.update(category),
    {
      onSuccess: () => {
        refetch();
        setShowForm(false);
      },
      onError: error => logger.error(error),
    }
  );

  return (
    <>
      <Draggable draggableId={id} index={index} key={id}>
        {provided => (
          <div
            ref={provided.innerRef}
            className={` flex w-full  ${
              active ? "bg-indigo-200" : "hover:bg-gray-200"
            } mb-2 items-center justify-between rounded-md p-2 `}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setActiveCategory(category)}
          >
            <div>
              <Typography style="h4">{name}</Typography>
              <Typography className="mt-1" style="body3">
                {`${articles.length} ${
                  articles.length > 1 ? "articles" : "article"
                }`}
              </Typography>
            </div>
            <Dropdown buttonSize="small" buttonStyle="text" icon={MenuVertical}>
              <MenuItem.Button onClick={() => setShowForm(true)}>
                Edit
              </MenuItem.Button>
              {!(category.name === "General" && categoryList.length === 1) && (
                <MenuItem.Button
                  style="danger"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </MenuItem.Button>
              )}
            </Dropdown>
          </div>
        )}
      </Draggable>
      {showForm && (
        <Form
          category={category}
          handleSubmit={editCategory}
          onClose={() => setShowForm(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          category={category}
          categoryList={categoryList}
          refetch={refetch}
          setActiveCategory={setActiveCategory}
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
        />
      )}
    </>
  );
};

export default CategoryCard;
