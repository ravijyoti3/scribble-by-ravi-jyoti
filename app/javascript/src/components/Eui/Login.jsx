import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import { setAuthHeaders } from "apis/axios";
import organizationsApi from "apis/organizations";

import LoginImage from "./LoginImage";

const Login = ({ organizationData, setIsPasswordValidated }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async values => {
    try {
      const response = await organizationsApi.login({
        password: values.password,
      });
      localStorage.setItem(
        "authToken",
        JSON.stringify({ token: response.data.authentication_token })
      );
      setAuthHeaders();
      setIsPasswordValidated(true);
      window.location.href = "/public";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="mt-16 flex grid justify-center">
      <img alt="Login Image" className="justify-self-center" src={LoginImage} />
      <Typography className="mt-5" style="h2">
        {organizationData.name} is password protected!
      </Typography>
      <Typography className="text-gray-600" style="body2">
        Enter the password to gain access to spinkart.
      </Typography>
      <Formik
        initialValues={{ password: "" }}
        validateOnBlur={submitted}
        validateOnChange={submitted}
        validationSchema={yup.object().shape({
          password: yup.string().required("Password is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm className="">
            <Input
              className="mt-5 w-full"
              label="Password"
              name="password"
              type="password"
            />
            <Button
              className="mt-5"
              disabled={isSubmitting}
              label="Continue"
              loading={isSubmitting}
              type="submit"
              onClick={() => setSubmitted(true)}
            />
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Login;
