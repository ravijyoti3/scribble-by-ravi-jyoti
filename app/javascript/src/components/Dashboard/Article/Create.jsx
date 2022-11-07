import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, ActionDropdown, PageLoader, Dropdown } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";
import { useParams } from "react-router-dom";

import articlesApi from "apis/admin/articles";
import categoriesApi from "apis/admin/categories";
import TooltipWrapper from "components/Common/TooltipWrapper";

import { FORM_VALIDATION_SCHEMA, INITIAL_FORM_VALUES } from "./constants";

const Create = ({ history }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [submitButtonLabel, setSubmitButtonLabel] = useState("Save Draft");

  const { Menu, MenuItem } = ActionDropdown;
  const { id } = useParams();
  const articleStatus = ["Publish", "Save Draft"];
  const fetchArticle = async () => {
    try {
      const { data } = await articlesApi.show(id);
      const payload = {
        title: data.title,
        body: data.body,
        status: data.status,
        category: {
          label: data.category.name,
          value: data.category.id,
        },
      };
      setArticle(payload);
      setSubmitButtonLabel(
        data.status === "published" ? "Publish" : "Save Draft"
      );
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
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
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  const handleSubmit = async article => {
    const { title, body, status } = article;
    const payload = {
      title,
      body,
      status,
      category_id: article.category.value,
    };
    try {
      if (id) {
        await articlesApi.update({
          id,
          payload,
        });
      } else {
        await articlesApi.create(payload);
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

  if (pageLoading) {
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
                <TooltipWrapper
                  content="Please make change to save"
                  disabled={isSubmitting || !(isValid && dirty)}
                  position="bottom"
                >
                  <Button
                    className="mr-px"
                    disabled={isSubmitting || !(isValid && dirty)}
                    label={submitButtonLabel}
                    pageLoading={isSubmitting}
                    size="medium"
                    style="primary"
                    type="submit"
                    onClick={() => setSubmitted(true)}
                  />
                </TooltipWrapper>
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
                onClick={() => history.push("/")}
              />
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Create;
