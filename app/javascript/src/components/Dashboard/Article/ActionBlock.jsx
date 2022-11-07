import React from "react";

import { Button } from "neetoui";

import TooltipWrapper from "components/Common/TooltipWrapper";

import ColumnsDropDown from "./ColumnsDropDown";

const ActionBlock = ({ setVisibleColumns, visibleColumns, categories }) => (
  <div className="flex items-center justify-between">
    <ColumnsDropDown
      setVisibleColumns={setVisibleColumns}
      visibleColumns={visibleColumns}
    />
    <TooltipWrapper
      content="Add category to create an article"
      disabled={categories.length === 0}
      followCursor="horizontal"
      position="bottom"
    >
      <Button
        className="mx-2"
        disabled={categories.length === 0}
        label="Add New Article"
        to={categories.length > 0 ? "/articles/create" : "/"}
      />
    </TooltipWrapper>
  </div>
);

export default ActionBlock;
