import React, { useState } from "react";

import { Delete, Edit, Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { useMutation } from "react-query";

import redirectionsApi from "apis/admin/redirections";
import { useKey } from "hooks/useKey";

import DeleteAlert from "./DeleteAlert";
import Form from "./Form";

const Table = ({ redirections, refetch }) => {
  const [editingKey, setEditingKey] = useState("");
  const [showAddRow, setShowAddRow] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { origin } = window.location;

  const { mutate: addRedirection } = useMutation(
    async payload => await redirectionsApi.create(payload),
    {
      onSuccess: () => {
        setShowAddRow(false);
        refetch();
      },
      onError: error => logger.error(error),
    }
  );

  const { mutate: updateRedirection } = useMutation(
    async payload => await redirectionsApi.update(payload),
    {
      onSuccess: () => {
        setEditingKey("");
        setShowAddRow(false);
        refetch();
      },
      onError: error => logger.error(error),
    }
  );

  useKey("Escape", () => {
    setEditingKey("");
    setShowAddRow(false);
  });

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
      {redirections?.map(item =>
        editingKey === item.id ? (
          <Form
            initialValues={item}
            key={item.id}
            redirections={redirections}
            refetch={refetch}
            setEditingKey={setEditingKey}
            submitHandler={updateRedirection}
          />
        ) : (
          <div
            className="mb-2 grid grid-flow-row grid-cols-5 items-center justify-between gap-4  bg-white p-2"
            key={item.id}
          >
            <Typography className="col-span-2" style="body3">
              <span className="text-gray-400">{origin}</span>
              {item.from}
            </Typography>
            <Typography className="col-span-2" style="body3">
              {`${origin}${item.to}`}
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
          redirections={redirections}
          setShowAddRow={setShowAddRow}
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
