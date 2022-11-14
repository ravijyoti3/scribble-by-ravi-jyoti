import * as yup from "yup";

export const GENERAL_SETTING_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Organization Name is required"),
  password_protected: yup.boolean(),
  changePassword: yup.boolean(),
  password: yup
    .string()
    .when("changePassword", {
      is: false,
      then: yup.string().notRequired(),
    })
    .when("changePassword", {
      is: true,
      then: yup.string().when("password_protected", {
        is: true,
        then: yup
          .string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/,
            "Password must have one letter and one number"
          ),
      }),
    }),
});

export const LEFT_MENU_ITEMS = [
  {
    description: "Page Title, Brand Name & Meta Description",
    label: "General",
    tab: "general",
    id: 0,
  },
  {
    description: "Create & configure redirection rules",
    label: "Redirections",
    tab: "redirections",
    id: 1,
  },
  {
    description: "Edit and Reorder KB Structure",
    label: "Manage Categories",
    tab: "categories",
    id: 2,
  },
];

export const GENERAL_SETTING_FORM_INITIAL_VALUE = {
  name: "",
  password: "",
};

export const REDIRECTIONS_FORM_INITIAL_VALUE = {
  from: "/",
  to: "/",
};

export const REDIRECTIONS_SETTING_FORM_VALIDATION_SCHEMA = yup.object().shape({
  from: yup
    .string()
    .notOneOf([yup.ref("to")], "From and To cannot be same")
    .matches(/^\/[a-zA-Z0-9/?&=]+$/i, "From must be in the format of '/path'")
    .required("From Path is required"),
  to: yup
    .string()
    .matches(/^\/[a-zA-Z0-9/?&=]+$/i, "To must be in the format of '/path'")
    .required("To Path is required"),
});

export const CATEGORY_FORM_INITIAL_VALUE = {
  name: "",
};

export const CATEGORY_SETTING_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Category is required"),
});
