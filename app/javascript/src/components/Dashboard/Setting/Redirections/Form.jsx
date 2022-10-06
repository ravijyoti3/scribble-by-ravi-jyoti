import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check } from "neetoicons";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";

import {
  REDIRECTIONS_FORM_INITIAL_VALUE,
  REDIRECTIONS_SETTING_FORM_VALIDATION_SCHEMA,
} from "../constants";

const Form = ({ submitHandler }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    Toastr.success("Redirection added successfully.");
    submitHandler();
  };

  return (
    <Formik
      initialValues={REDIRECTIONS_FORM_INITIAL_VALUE}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={REDIRECTIONS_SETTING_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm className="mb-2 grid grid-flow-row grid-cols-5 items-center justify-between gap-4 bg-white p-2">
          <Input className="col-span-2" name="from_path" />
          <Input className="col-span-2" name="to_path" />
          <div className="flex w-full justify-center">
            <Button
              disabled={isSubmitting}
              icon={Check}
              loading={isSubmitting}
              style="text"
              type="submit"
              onClick={() => setSubmitted(true)}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
