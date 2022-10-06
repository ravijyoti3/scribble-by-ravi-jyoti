import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Plus, Edit, Delete, Check } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";

import {
  CATEGORIES_DATA,
  CATEGORY_FORM_INITIAL_VALUE,
  CATEGORY_SETTING_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Categories = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const handleSubmit = () => {
    setShowAddCategory(false);
    setEditingKey("");
  };

  const Form = () => (
    <Formik
      initialValues={CATEGORY_FORM_INITIAL_VALUE}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={CATEGORY_SETTING_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm className="my-3 w-1/2">
          <Input
            className=""
            name="category"
            suffix={
              <Button
                disabled={isSubmitting}
                icon={Check}
                loading={isSubmitting}
                style="text"
                type="submit"
                onClick={() => setSubmitted(true)}
              />
            }
          />
        </FormikForm>
      )}
    </Formik>
  );

  return (
    <div className="flex w-full justify-center">
      <div className="w-3/5 pt-12">
        <Typography style="h3">Manage Categories</Typography>
        <Typography className="mt-1 text-gray-600" style="body2">
          Create and configure the categories inside your scribble.
        </Typography>
        {showAddCategory ? (
          <Form />
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
        {CATEGORIES_DATA.map(item => (
          <>
            <hr />
            {item.id === editingKey ? (
              <Form />
            ) : (
              <div className="flex items-center justify-between py-2">
                <Typography style="h5">{item.title}</Typography>
                <div className="flex justify-around">
                  <Button icon={Delete} style="text" />
                  <Button
                    icon={Edit}
                    style="text"
                    onClick={() => setEditingKey(item.id)}
                  />
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Categories;
