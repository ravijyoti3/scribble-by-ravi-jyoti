import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useMutation } from "react-query";

import categoriesApi from "apis/admin/categories";
import { useKey } from "hooks/useKey";

import Card from "./Card";

import Form from "../Form";
import { onDragEnd } from "../utils";

const CategoryColumn = ({
  activeCategory,
  setActiveCategory,
  refetch,
  categoryList,
  setCategoryList,
}) => {
  const [showAddCategory, setShowAddCategory] = useState(false);

  const { mutate: addCategory } = useMutation(
    async category => await categoriesApi.create(category),
    {
      onSuccess: () => {
        refetch();
        setShowAddCategory(false);
      },
      onError: error => logger.error(error),
    }
  );

  useKey("Escape", () => {
    setShowAddCategory(false);
  });

  return (
    <div className="border-r px-4 pt-3">
      <div className="mb-3 flex w-full items-center justify-between">
        <Typography style="h4">Manage Categories</Typography>
        <Button
          className="rounded-sm"
          icon={Plus}
          size="small"
          onClick={() => setShowAddCategory(true)}
        />
      </div>
      {showAddCategory && (
        <Form
          handleSubmit={addCategory}
          onClose={() => setShowAddCategory(false)}
        />
      )}
      <DragDropContext
        onDragEnd={finalPosition =>
          onDragEnd(finalPosition, categoryList, setCategoryList, categoriesApi)
        }
      >
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {categoryList.map((category, idx) => (
                <Card
                  active={activeCategory?.id === category.id}
                  category={category}
                  categoryList={categoryList}
                  index={idx}
                  key={category.id}
                  refetch={refetch}
                  setActiveCategory={setActiveCategory}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CategoryColumn;
