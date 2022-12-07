import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, Dropdown, ActionDropdown } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";

import articlesApi from "apis/admin/articles";
import TooltipWrapper from "components/Common/TooltipWrapper";

import { FORM_VALIDATION_SCHEMA, INITIAL_FORM_VALUES } from "../constants";

const Form = ({
  categoryList,
  article,
  submitButtonLabel,
  setSubmitButtonLabel,
  id,
  history,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const articleStatus = ["Publish", "Save Draft"];
  const { Menu, MenuItem } = ActionDropdown;

  const handleSubmit = async article => {
    const { title, body, status } = article;
    const payload = {
      title,
      body,
      status,
      category_id: article.category.value,
      restored_from: null,
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

  return (
    <div className="col-span-3">
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
            <div className="w-3/5">
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
    </div>
  );
};

export default Form;
