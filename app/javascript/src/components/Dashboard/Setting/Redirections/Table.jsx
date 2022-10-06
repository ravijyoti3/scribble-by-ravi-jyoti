import React, { useState } from "react";

import { Delete, Edit, Plus } from "neetoicons";
import { Typography, Button } from "neetoui";

import Form from "./Form";

import {
  REDIRECTIONS_DEFAULT_URL,
  REDIRECTIONS_SETTING_ROW_DATA,
} from "../constants";

const Table = () => {
  const [editingKey, setEditingKey] = useState("");
  const [showAddRow, setShowAddRow] = useState(false);

  const onCreate = key => {
    //TODO: add create logic
    setEditingKey(key);
    setShowAddRow(false);
  };

  const onUpdate = key => {
    //TODO: add update logic
    setEditingKey(key);
  };

  return (
    <>
      <div className="mb-2 grid grid-flow-row grid-cols-5 items-center justify-between">
        <Typography className="col-span-2 uppercase text-gray-600" style="h6">
          From Path
        </Typography>
        <Typography className="col-span-2 uppercase text-gray-600" style="h6">
          To Path
        </Typography>
        <Typography
          className="flex justify-center uppercase text-gray-600"
          style="h6"
        >
          Actions
        </Typography>
      </div>
      {REDIRECTIONS_SETTING_ROW_DATA.map(item =>
        editingKey === item.key ? (
          <Form submitHandler={onUpdate} />
        ) : (
          <div
            className="mb-2 grid grid-flow-row grid-cols-5 items-center justify-between bg-white p-2"
            key={item.key}
          >
            <Typography className="col-span-2" style="body3">
              <span className="text-gray-400">{REDIRECTIONS_DEFAULT_URL}</span>
              {item.from_path}
            </Typography>
            <Typography className="col-span-2" style="body3">
              {`${REDIRECTIONS_DEFAULT_URL}${item.to_path}`}
            </Typography>
            <div className="flex justify-around">
              <Button icon={Delete} style="text" />
              <Button
                icon={Edit}
                style="text"
                onClick={() => setEditingKey(item.key)}
              />
            </div>
          </div>
        )
      )}
      {showAddRow && <Form submitHandler={onCreate} />}
      <Button
        className="mt-5 rounded-sm"
        icon={Plus}
        iconPosition="left"
        label="Add New Redirection"
        style="link"
        onClick={() => setShowAddRow(true)}
      />
    </>
  );
};

export default Table;
