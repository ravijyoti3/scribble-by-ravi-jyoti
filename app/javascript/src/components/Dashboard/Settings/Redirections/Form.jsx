import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import {
  REDIRECTIONS_FORM_INITIAL_VALUE,
  REDIRECTIONS_SETTING_FORM_VALIDATION_SCHEMA,
} from "../constants";

const Form = ({
  submitHandler,
  initialValues,
  redirectionsData,
  setEditingKey,
  setShowAddRow,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async values => {
    submitHandler(values);
    setSubmitted(true);
  };

  return (
    <Formik
      validateOnChange
      initialValues={initialValues || REDIRECTIONS_FORM_INITIAL_VALUE}
      validateOnBlur={submitted}
      validationSchema={REDIRECTIONS_SETTING_FORM_VALIDATION_SCHEMA(
        redirectionsData
      )}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm className="mb-2 grid grid-flow-row grid-cols-5 items-center justify-between gap-4 bg-white p-2">
          <Input className="col-span-2" name="from" />
          <Input className="col-span-2" name="to" />
          <div className="flex justify-around ">
            <Button
              disabled={isSubmitting}
              icon={Check}
              style="text"
              type="submit"
            />
            <Button
              icon={Close}
              style="text"
              type="cancel"
              onClick={() =>
                setShowAddRow ? setShowAddRow(false) : setEditingKey("")
              }
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
