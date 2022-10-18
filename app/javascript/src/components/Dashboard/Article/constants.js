import { buildSelectOptions } from "utils";
import * as yup from "yup";

export const CATEGORY_DATA = buildSelectOptions([
  "Getting Started",
  "Misc",
  "Security & Privacy",
]);

export const INITIAL_FORM_VALUES = {
  title: "",
  category: {
    value: "",
    label: "",
  },
  body: "",
};

export const FORM_VALIDATION_SCHEMA = CATEGORY_LIST =>
  yup.object().shape({
    title: yup.string().required("Title is required"),
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(CATEGORY_LIST.map(cat => cat.label)),
        value: yup.number().oneOf(CATEGORY_LIST.map(cat => cat.value)),
      })
      .required("Category is required"),
    body: yup.string().required("Body is required"),
  });

export const CATEGORTY_INITIAL_FORM_VALUE = {
  name: "",
};

export const CATEGORY_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Category is required"),
});
