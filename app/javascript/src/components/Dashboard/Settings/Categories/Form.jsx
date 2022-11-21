import React, { useRef, useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Button, Pane, Typography } from "neetoui";
import { Input } from "neetoui/formik";

import TooltipWrapper from "components/Common/TooltipWrapper";

import {
  CATEGORY_FORM_INITIAL_VALUE,
  CATEGORY_SETTING_FORM_VALIDATION_SCHEMA,
} from "../constants";

const Form = ({ handleSubmit, category, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const inputRef = useRef(null);

  return (
    <Pane isOpen initialFocusRef={inputRef} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Add category
        </Typography>
      </Pane.Header>
      <Formik
        initialValues={category || CATEGORY_FORM_INITIAL_VALUE}
        validateOnBlur={submitted}
        validateOnChange={submitted}
        validationSchema={CATEGORY_SETTING_FORM_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <FormikForm className="my-3">
            <Pane.Body>
              <Input
                className="w-full"
                label="Category name"
                name="name"
                ref={inputRef}
              />
            </Pane.Body>
            <Pane.Footer className="flex items-center space-x-2">
              <TooltipWrapper
                content="Please make change to save"
                position="bottom"
              >
                <Button
                  disabled={isSubmitting || !dirty}
                  icon={Check}
                  label="Save Changes"
                  loading={isSubmitting}
                  type="submit"
                  onClick={() => setSubmitted(true)}
                />
              </TooltipWrapper>
              <Button
                icon={Close}
                label="Cancel"
                style="text"
                type="reset"
                onClick={onClose}
              />
            </Pane.Footer>
          </FormikForm>
        )}
      </Formik>
    </Pane>
  );
};

export default Form;
