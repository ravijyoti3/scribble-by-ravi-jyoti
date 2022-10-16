import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, ActionDropdown } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";

import articlesApi from "apis/articles";

import {
  FORM_VALIDATION_SCHEMA,
  INITIAL_FORM_VALUES,
  CATEGORY_DATA,
} from "./constants";

const Create = ({ onClose, history }) => {
  const [submitted, setSubmitted] = useState(false);
  const { Menu, MenuItem } = ActionDropdown;

  const handleSubmit = async article => {
    const { title, body, status } = article;
    const data = { title, body, status };
    try {
      await articlesApi.create(data);
      history.push("/articles");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, submitForm }) => (
        <FormikForm className="mt-5 flex w-full justify-center">
          <div className="w-1/2">
            <div className="space-between grid w-full grid-flow-row grid-cols-3 gap-4 ">
              <Input
                className="col-span-2 mr-4 w-full rounded-sm"
                label="Article Title"
                name="title"
              />
              <Select
                isClearable
                isSearchable
                className="w-full flex-grow-0 "
                label="Category"
                name="category"
                options={CATEGORY_DATA}
                placeholder="Select Category"
              />
            </div>
            <Textarea
              className="mt-5 w-full flex-grow-0"
              label="Article Body"
              name="body"
              rows={11}
            />
            <div className="mt-5 flex">
              <ActionDropdown
                closeOnSelect={false}
                label="Save Draft"
                buttonProps={{
                  type: "submit",
                  loading: isSubmitting,
                  disabled: isSubmitting,
                }}
                onClick={() => {
                  setFieldValue("status", "draft");
                  setSubmitted(true);
                }}
              >
                <Menu
                  dropdownProps={{
                    closeOnSelect: false,
                  }}
                >
                  <MenuItem.Button
                    type="submit"
                    onClick={() => {
                      submitForm();
                      setFieldValue("status", "published");
                      setSubmitted(true);
                    }}
                  >
                    Publish
                  </MenuItem.Button>
                </Menu>
              </ActionDropdown>
              <Button
                className="rounded-sm"
                label="Cancel"
                style="text"
                type="reset"
                onClick={onClose}
              />
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Create;
