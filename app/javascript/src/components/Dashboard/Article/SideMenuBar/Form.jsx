import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useMutation } from "react-query";

import categoryApi from "apis/admin/categories";

import {
  CATEGORTY_INITIAL_FORM_VALUE,
  CATEGORY_FORM_VALIDATION_SCHEMA,
} from "../constants";

const Form = ({ setIsAddCollapsed, refetch }) => {
  const [submitted, setSubmitted] = useState(false);

  const { mutate: createCategory } = useMutation(
    async category => await categoryApi.create(category),
    {
      onSuccess: () => {
        setIsAddCollapsed(true);
        setSubmitted(true);
        refetch();
      },
      onError: error => {
        logger.error(error);
      },
    }
  );

  return (
    <Formik
      initialValues={CATEGORTY_INITIAL_FORM_VALUE}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={CATEGORY_FORM_VALIDATION_SCHEMA}
      onSubmit={createCategory}
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
