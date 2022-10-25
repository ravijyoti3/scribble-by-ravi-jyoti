import React, { useEffect, useState } from "react";

import { Form as FormikForm, Formik } from "formik";
import { Typography, Button } from "neetoui";
import {
  Input as FormikInput,
  Checkbox as FormikCheckbox,
} from "neetoui/formik";

import organizationsApi from "apis/organizations";

import { GENERAL_SETTING_FORM_VALIDATION_SCHEMA } from "./constants";

const General = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [organizationData, setOrganizationData] = useState(null);
  const [changePassword, setChangePassword] = useState(false);

  const fetchOrganizationDetails = async () => {
    try {
      const { data } = await organizationsApi.show();
      setOrganizationData({
        ...data,
        password: data.password_digest,
        change_password: false,
      });
      setShowPasswordField(data.password_protected);
    } catch (err) {
      logger.error(err);
    }
  };

  const handleSubmit = async values => {
    try {
      await organizationsApi.update(values);
      setSubmitted(true);
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchOrganizationDetails();
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="w-1/3 pt-12">
        <Typography style="h3">General Settings</Typography>
        <Typography className="mt-1 text-gray-600" style="body2">
          Configure general attributes of scribble.
        </Typography>
        <Formik
          enableReinitialize
          validateOnChange
          initialValues={organizationData}
          validateOnBlur={submitted}
          validationSchema={GENERAL_SETTING_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, dirty }) => (
            <FormikForm validateOnChange className="mt-8">
              <FormikInput
                helpText="Customize the organization name which is used to show the organization name in Open Graph Tags."
                label="Organization Name"
                name="name"
              />
              <hr className="mt-3" />
              <FormikCheckbox
                className="mt-3"
                label="Password Protect Knowledge Base"
                name="password_protected"
                onChange={() => {
                  setFieldValue("password_protected", !showPasswordField);
                  setShowPasswordField(showPasswordField => !showPasswordField);
                }}
              />
              {showPasswordField && (
                <div className="flex items-end">
                  <FormikInput
                    className="mt-5"
                    disabled={!changePassword}
                    label="Password"
                    name="password"
                    type="password"
                    placeholder={
                      changePassword ? "Enter new password" : "********"
                    }
                  />
                  <Button
                    className="ml-3 rounded-sm bg-gray-800 hover:bg-gray-600"
                    disabled={changePassword}
                    label="Change Password"
                    style="primary"
                    onClick={() => {
                      setFieldValue("change_password", true);
                      setChangePassword(true);
                    }}
                  />
                </div>
              )}
              <div className="mt-6 flex">
                <Button
                  className="mr-3 rounded-sm bg-gray-800 hover:bg-gray-600"
                  disabled={isSubmitting || !dirty}
                  label="Save changes"
                  loading={isSubmitting}
                  style="primary"
                  type="submit"
                />
                <Button
                  className="rounded-sm"
                  label="Cancel"
                  style="text"
                  type="reset"
                  onClick={() => {
                    setChangePassword(false);
                    setShowPasswordField(organizationData.password_protected);
                  }}
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
