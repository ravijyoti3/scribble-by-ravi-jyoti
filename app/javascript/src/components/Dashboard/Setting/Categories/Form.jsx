import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import {
  CATEGORY_FORM_INITIAL_VALUE,
  CATEGORY_SETTING_FORM_VALIDATION_SCHEMA,
} from "../constants";

const Form = ({ handleSubmit }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
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
            name="name"
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
};

export default Form;
