import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import categoryApi from "apis/admin/categories";

import {
  CATEGORTY_INITIAL_FORM_VALUE,
  CATEGORY_FORM_VALIDATION_SCHEMA,
} from "../constants";

const Form = ({ setIsAddCollapsed, refetch }) => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async category => {
    try {
      await categoryApi.create(category);
    } catch (error) {
      logger.error(error);
    }
    setIsAddCollapsed(true);
    refetch();
    setSubmitted(true);
  };

  return (
    <Formik
      initialValues={CATEGORTY_INITIAL_FORM_VALUE}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={CATEGORY_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <Input
          required
          name="name"
          suffix={<Button icon={Check} style="text" type="submit" />}
          type="text"
        />
      </FormikForm>
    </Formik>
  );
};

export default Form;
