import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, ActionDropdown, PageLoader } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { FORM_VALIDATION_SCHEMA, INITIAL_FORM_VALUES } from "./constants";

const Create = ({ onClose, history }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Menu, MenuItem } = ActionDropdown;

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategoryList(
        categories.map(category => ({
          label: category.name,
          value: category.id,
        }))
      );
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async article => {
    const { title, body, status } = article;
    const category_id = article.category.value;
    const data = { title, body, status, category_id };
    try {
      await articlesApi.create(data);
      history.push("/articles");
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={FORM_VALIDATION_SCHEMA(categoryList)}
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
                isSearchable
                required
                className="w-full flex-grow-0 "
                label="Category"
                name="category"
                options={categoryList}
                placeholder="Select Category"
              />
            </div>
            <Textarea
              required
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
                <Menu>
                  <MenuItem.Button
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
