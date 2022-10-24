import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, ActionDropdown, PageLoader, Dropdown } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { FORM_VALIDATION_SCHEMA, INITIAL_FORM_VALUES } from "./constants";

const Create = ({ onClose, history }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [submitButtonLabel, setSubmitButtonLabel] = useState();

  const { Menu, MenuItem } = ActionDropdown;
  const { id } = useParams();
  const articleStatus = ["Publish", "Save Draft"];
  const fetchArticle = async () => {
    try {
      const { data } = await articlesApi.show(id);
      setArticle({
        title: data.article.title,
        body: data.article.body,
        status: data.article.status,
        category: {
          label: data.article.category,
          value: data.article.category_id,
        },
      });
      setSubmitButtonLabel(
        data.article.status === "published" ? "Publish" : "Save Draft"
      );
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

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
      if (id) {
        await articlesApi.update({
          id,
          payload: {
            title: article.title,
            body: article.body,
            status: article.status === "published" ? 1 : 0,
            category_id: article.category.value,
          },
        });
      } else {
        await articlesApi.create(data);
      }
      history.push("/articles");
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (id) fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Formik
      enableReinitialize
      initialValues={id ? article : INITIAL_FORM_VALUES}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={FORM_VALIDATION_SCHEMA(categoryList)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, dirty, isValid }) => (
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
              <div className="flex">
                <Button
                  className="mr-px"
                  disabled={isSubmitting || !(isValid && dirty)}
                  label={submitButtonLabel}
                  loading={isSubmitting}
                  size="medium"
                  style="primary"
                  type="submit"
                  onClick={() => setSubmitted(true)}
                />
                <Dropdown
                  className="mr-3"
                  disabled={isSubmitting}
                  type="submit"
                >
                  <Menu>
                    {articleStatus.map((status, idx) => (
                      <MenuItem.Button
                        key={idx}
                        onClick={() => {
                          setSubmitButtonLabel(status);
                          setFieldValue(
                            "status",
                            status === "Save Draft" ? 0 : 1
                          );
                        }}
                      >
                        {status}
                      </MenuItem.Button>
                    ))}
                  </Menu>
                </Dropdown>
              </div>
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
