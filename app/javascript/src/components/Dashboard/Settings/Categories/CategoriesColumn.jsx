import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import categoriesApi from "apis/admin/categories";
import { useKey } from "hooks/useKey";

import CategoryCard from "./CategoryCard";
import Form from "./Form";

const CategoriesColumn = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoriesDetails = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategoryList(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategoriesDetails();
  }, []);

  const reorder = (categoryList, startIndex, endIndex) => {
    const shuffledCategoryList = Array.from(categoryList);
    const [removed] = shuffledCategoryList.splice(startIndex, 1);
    shuffledCategoryList.splice(endIndex, 0, removed);

    return shuffledCategoryList;
  };

  const onDragEnd = async finalPosition => {
    if (finalPosition.destination) {
      const reorderedItems = reorder(
        categoryList,
        finalPosition.source.index,
        finalPosition.destination.index
      );
      setCategoryList(reorderedItems);
      await categoriesApi.positionUpdate({
        id: finalPosition.draggableId,
        finalPosition: finalPosition.destination.index + 1,
      });
    }
  };

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
          refetch={fetchCategoriesDetails}
          setShowAddCategory={setShowAddCategory}
          showAddCategory={showAddCategory}
        />
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {categoryList.map((category, idx) => (
                <CategoryCard
                  category={category}
                  categoryList={categoryList}
                  index={idx}
                  key={idx}
                  refetch={fetchCategoriesDetails}
                  setCategoryList={setCategoryList}
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

export default CategoriesColumn;
