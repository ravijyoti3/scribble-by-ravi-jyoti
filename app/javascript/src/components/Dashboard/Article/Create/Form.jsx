import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, Dropdown, ActionDropdown } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";

import articlesApi from "apis/admin/articles";
import TooltipWrapper from "components/Common/TooltipWrapper";

import ForceStatusChangeAlert from "./ForceStatusChangeAlert";
import ScheduleInfo from "./ScheduleInfo";

import { FORM_VALIDATION_SCHEMA, INITIAL_FORM_VALUES } from "../constants";

const Form = ({
  categoryList,
  article,
  submitButtonLabel,
  setSubmitButtonLabel,
  id,
  refetch,
  history,
  setShowScheduleArticleModal,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [showForceStatusChangeAlert, setShowForceStatusChangeAlert] =
    useState(false);
  const articleStatus = ["Publish", "Save Draft"];
  const { Menu, MenuItem } = ActionDropdown;
  const showPublishLater =
    !article?.schedule?.publish_at &&
    (article?.status !== "published" || article?.schedule?.unpublish_at);
  const showUnpublishLater =
    !article?.schedule?.unpublish_at &&
    (article?.status !== "draft" || article?.schedule?.publish_at);

  const handleSubmit = async articleValues => {
    const { title, body, status } = articleValues;
    const payload = {
      title,
      body,
      status,
      category_id: articleValues.category.value,
      restored_from: null,
    };
    const articleChanged =
      article.status !== articleValues.status &&
      (article.schedule.publish_at || article.schedule.unpublish_at);

    try {
      if (articleChanged) {
        setShowForceStatusChangeAlert(true);
      } else if (id) {
        await articlesApi.update({
          id,
          payload,
        });
        history.push("/articles");
      } else {
        await articlesApi.create(payload);
        history.push("/articles");
      }
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="border-r col-span-3">
      <Formik
        enableReinitialize
        initialValues={id ? article : INITIAL_FORM_VALUES}
        validateOnBlur={submitted}
        validateOnChange={submitted}
        validationSchema={FORM_VALIDATION_SCHEMA(categoryList)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values, dirty, isValid }) => (
          <FormikForm className="mt-5 flex w-full justify-center">
            <div className="w-3/5">
              <ScheduleInfo article={article} refetch={refetch} />
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
                    {values?.status !== 2 && (
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
                    )}
                    {values?.status === 2 && (
                      <Button
                        className="mr-px"
                        label={submitButtonLabel}
                        size="medium"
                        style="primary"
                        onClick={() => setShowScheduleArticleModal(true)}
                      />
                    )}
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
                              status === "Publish" ? 1 : 0
                            );
                          }}
                        >
                          {status}
                        </MenuItem.Button>
                      ))}
                      {showPublishLater && (
                        <MenuItem.Button
                          onClick={() => {
                            setSubmitButtonLabel("Publish Later");
                            setFieldValue("status", 2);
                          }}
                        >
                          Publish Later
                        </MenuItem.Button>
                      )}
                      {showUnpublishLater && (
                        <MenuItem.Button
                          onClick={() => {
                            setSubmitButtonLabel("Unpublish Later");
                            setFieldValue("status", 2);
                          }}
                        >
                          Unpublish Later
                        </MenuItem.Button>
                      )}
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
            {showForceStatusChangeAlert && (
              <ForceStatusChangeAlert
                articleId={article.id}
                history={history}
                values={values}
                onClose={() => setShowForceStatusChangeAlert(false)}
              />
            )}
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
