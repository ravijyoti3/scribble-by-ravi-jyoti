import React, { useState } from "react";

import { Delete, Edit, Plus } from "neetoicons";
import { Typography, Button } from "neetoui";

import redirectionsApi from "apis/redirections";

import DeleteAlert from "./DeleteAlert";
import Form from "./Form";

import { REDIRECTIONS_DEFAULT_URL } from "../constants";

const Table = ({ redirectionsData, refetch }) => {
  const [editingKey, setEditingKey] = useState("");
  const [showAddRow, setShowAddRow] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const addRedirection = async payload => {
    try {
      await redirectionsApi.create(payload);
      setShowAddRow(false);
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  const updateRedirection = async payload => {
    try {
      await redirectionsApi.update(payload);
      setEditingKey("");
      setShowAddRow(false);
      refetch();
    } catch (error) {
      logger.error(error);
    }
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
      {redirectionsData.map(item =>
        editingKey === item.id ? (
          <Form
            initialValues={item}
            redirectionsData={redirectionsData}
            refetch={refetch}
            submitHandler={updateRedirection}
          />
        ) : (
          <div
            className="mb-2 grid grid-flow-row grid-cols-5 items-center justify-between bg-white p-2"
            key={item.id}
          >
            <Typography className="col-span-2" style="body3">
              <span className="text-gray-400">{REDIRECTIONS_DEFAULT_URL}</span>
              {item.from}
            </Typography>
            <Typography className="col-span-2" style="body3">
              {`${REDIRECTIONS_DEFAULT_URL}${item.to}`}
            </Typography>
            <div className="flex justify-around">
              <Button
                icon={Delete}
                style="text"
                onClick={() => {
                  setDeleteId(item.id);
                  setShowDeleteAlert(true);
                }}
              />
              <Button
                icon={Edit}
                style="text"
                onClick={() => setEditingKey(item.id)}
              />
            </div>
          </div>
        )
      )}
      {showAddRow && (
        <Form
          redirectionsData={redirectionsData}
          submitHandler={addRedirection}
        />
      )}
      <Button
        className="mt-5 rounded-sm"
        icon={Plus}
        iconPosition="left"
        label="Add New Redirection"
        style="link"
        onClick={() => setShowAddRow(true)}
      />
      <DeleteAlert
        id={deleteId}
        refetch={refetch}
        setShowDeleteAlert={setShowDeleteAlert}
        showDeleteAlert={showDeleteAlert}
      />
    </>
  );
};

export default Table;
