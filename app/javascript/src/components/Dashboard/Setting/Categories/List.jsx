import React, { useState } from "react";

import { Delete, Edit } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Draggable } from "react-beautiful-dnd";

import DeleteModal from "./DeleteModal";
import Form from "./Form";

const List = ({ category, index, refetch, categoryList }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
                isEdit
                id={category.id}
                initialValues={{ name: category.name }}
                refetch={refetch}
                setIsEdit={setIsEdit}
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
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
        />
      )}
    </>
  );
};

export default List;
