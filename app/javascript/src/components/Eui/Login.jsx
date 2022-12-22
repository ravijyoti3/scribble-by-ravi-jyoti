import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useMutation } from "react-query";
import * as yup from "yup";

import organizationApi from "apis/admin/organization";
import { setAuthHeaders } from "apis/axios";
import LoginImage from "images/Login";

const Login = ({ organizationData, setIsPasswordValidated }) => {
  const [submitted, setSubmitted] = useState(false);

  const { mutate: login } = useMutation(
    async values => {
      const { data } = await organizationApi.login(values);

      return data;
    },
    {
      onSuccess: data => {
        localStorage.setItem(
          "authToken",
          JSON.stringify({ token: data.authentication_token })
        );
        setAuthHeaders();
        setIsPasswordValidated(true);
        window.location.href = "/public";
      },
      onError: error => logger.error(error),
    }
  );

  return (
    <div className="mt-16 flex grid justify-center">
      <img alt="Login Image" className="justify-self-center" src={LoginImage} />
      <Typography className="mt-5" style="h2">
        {organizationData?.name} is password protected!
      </Typography>
      <Typography className="text-gray-600" style="body2">
        Enter the password to gain access to {organizationData?.name}.
      </Typography>
      <Formik
        initialValues={{ password: "" }}
        validateOnBlur={submitted}
        validateOnChange={submitted}
        validationSchema={yup.object().shape({
          password: yup.string().required("Password is required"),
        })}
        onSubmit={login}
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
