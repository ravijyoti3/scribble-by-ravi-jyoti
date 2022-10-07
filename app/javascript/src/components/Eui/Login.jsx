import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import LoginImage from "./LoginImage";

const Login = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="mt-16 flex grid justify-center">
      <img alt="Login Image" className="justify-self-center" src={LoginImage} />
      <Typography className="mt-5" style="h2">
        Spinkart is password protected!
      </Typography>
      <Typography className="text-gray-600" style="body2">
        Enter the password to gain access to spinkart.
      </Typography>
      <Formik
        initialValues={{ password: "" }}
        validateOnBlur={submitted}
        validateOnChange={submitted}
        validationSchema={yup.object().shape({
          category: yup.string().required("Category is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm className="">
            <Input className="mt-5 w-full" label="Password" name="password" />
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
