import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import TooltipWrapper from "components/Common/TooltipWrapper";

import {
  CATEGORY_FORM_INITIAL_VALUE,
  CATEGORY_SETTING_FORM_VALIDATION_SCHEMA,
} from "../constants";

const Form = ({ handleSubmit, category, showForm }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Formik
      initialValues={category || CATEGORY_FORM_INITIAL_VALUE}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={CATEGORY_SETTING_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty }) => (
        <FormikForm className="my-3 w-1/2">
          <Input
            className=""
            name="name"
            suffix={
              <>
                <TooltipWrapper
                  content="Please make change to save"
                  disabled={isSubmitting || !dirty}
                  position="bottom"
                >
                  <Button
                    disabled={isSubmitting || !dirty}
                    icon={Check}
                    loading={isSubmitting}
                    style="text"
                    type="submit"
                    onClick={() => setSubmitted(true)}
                  />
                </TooltipWrapper>
                <Button
                  icon={Close}
                  style="text"
                  type="reset"
                  onClick={() => showForm(false)}
                />
              </>
            }
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
