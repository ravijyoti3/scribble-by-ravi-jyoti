import React, { useState } from "react";

import { Form as FormikForm, Formik } from "formik";
import { Typography, Checkbox, Button } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";

import {
  GENERAL_SETTING_FORM_INITIAL_VALUE,
  GENERAL_SETTING_FORM_VALIDATION_SCHEMA,
} from "./constants";

const General = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-1/3 pt-12">
        <Typography style="h3">General Settings</Typography>
        <Typography className="mt-1 text-gray-600" style="body2">
          Configure general attributes of scribble.
        </Typography>
        <Formik
          initialValues={GENERAL_SETTING_FORM_INITIAL_VALUE}
          validateOnBlur={submitted}
          validateOnChange={submitted}
          validationSchema={GENERAL_SETTING_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <FormikForm className="mt-8">
              <FormikInput
                helpText="Customize the site name which is used to show the site name in Open Graph Tags."
                label="Site Name"
                name="site_name"
              />
              <hr className="mt-3" />
              <Checkbox
                className="mt-3"
                id="toggle_password_field"
                label="Password Protect Knowledge Base"
                onChange={() =>
                  setShowPasswordField(showPasswordField => !showPasswordField)
                }
              />
              {showPasswordField && (
                <FormikInput
                  className="mt-5"
                  label="Password"
                  name="password"
                  type="password"
                />
              )}
              <div className="mt-6 flex">
                <Button
                  className="mr-3 rounded-sm bg-gray-800 hover:bg-gray-600"
                  disabled={isSubmitting}
                  label="Save changes"
                  loading={isSubmitting}
                  style="primary"
                  type="submit"
                  onClick={() => setSubmitted(true)}
                />
                <Button
                  className="rounded-sm"
                  label="Cancel"
                  style="text"
                  type="reset"
                />
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default General;
