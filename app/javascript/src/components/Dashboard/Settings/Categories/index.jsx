import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button, PageLoader } from "neetoui";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import categoriesApi from "apis/admin/categories";
import { useKey } from "hooks/useKey";

import Form from "./Form";
import List from "./List";

const Categories = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoriesDetails = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setPageLoading(false);
      setCategoryList(categories);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  const addCategory = async category => {
    try {
      await categoriesApi.create(category);
      fetchCategoriesDetails();
      setShowAddCategory(false);
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
        id: parseInt(finalPosition.draggableId),
        finalPosition: finalPosition.destination.index + 1,
      });
    }
  };

  useKey("Escape", () => {
    setShowAddCategory(false);
  });

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-3/5 pt-12">
        <Typography style="h3">Manage Categories</Typography>
        <Typography className="mt-1 text-gray-600" style="body2">
          Create and configure the categories inside your scribble.
        </Typography>
        {showAddCategory ? (
          <Form handleSubmit={addCategory} showForm={setShowAddCategory} />
        ) : (
          <Button
            className="mb-4 mt-6 rounded-sm"
            icon={Plus}
            iconPosition="left"
            label="Add New Category"
            style="link"
            onClick={() => setShowAddCategory(true)}
          />
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {categoryList.map((category, idx) => (
                  <List
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
    </div>
  );
};

export default Categories;
