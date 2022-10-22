import * as yup from "yup";

export const GENERAL_SETTING_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Site Name is required"),
  password_protected: yup.boolean(),
  password: yup
    .string()
    .when("password_protected", {
      is: true,
      then: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/,
          "Password must have one letter and one number"
        ),
    })
    .when("password_protected", {
      is: false,
      then: yup.string().notRequired(),
    }),
});

export const LEFT_MENU_ITEMS = [
  {
    description: "Page Title, Brand Name & Meta Description",
    label: "General",
    linkTo: "/setting/general",
    id: 0,
  },
  {
    description: "Create & configure redirection rules",
    label: "Redirections",
    linkTo: "/setting/redirections",
    id: 1,
  },
  {
    description: "Edit and Reorder KB Structure",
    label: "Manage Categories",
    linkTo: "/setting/categories",
    id: 2,
  },
];

export const GENERAL_SETTING_FORM_INITIAL_VALUE = {
  name: "",
  password: "",
};

export const REDIRECTIONS_SETTING_ROW_DATA = [
  {
    from_path: "/welcome",
    to_path: "",
    key: 0,
  },
  {
    from_path: "/about",
    to_path: "/about-us",
    key: 1,
  },
];

export const REDIRECTIONS_DEFAULT_URL = "https://scribble.com";

export const REDIRECTIONS_FORM_INITIAL_VALUE = {
  from_path: REDIRECTIONS_DEFAULT_URL,
  to_path: "",
};

export const REDIRECTIONS_SETTING_FORM_VALIDATION_SCHEMA = yup.object().shape({
  from_path: yup.string().required("From Path is required"),
  to_path: yup.string().required("To Path is required"),
});

export const CATEGORIES_DATA = [
  {
    id: 0,
    title: "Security & Privacy",
  },
  {
    id: 1,
    title: "Getting Started",
  },
  {
    id: 2,
    title: "App & Integration",
  },
  {
    id: 3,
    title: "Misc",
  },
];

export const CATEGORY_FORM_INITIAL_VALUE = {
  name: "",
};

export const CATEGORY_SETTING_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Category is required"),
});
