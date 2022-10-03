import { buildSelectOptions } from "utils";
import * as yup from "yup";

export const ROW_DATA = [
  {
    id: 0,
    title: "Oliver Smith",
    date: "Sep 23, 2022",
    author: "William",
    category: "Romance",
    status: "Draft",
  },
  {
    id: 1,
    title: "Oliver Smith",
    date: "Sep 23, 2022",
    author: "William",
    category: "Romance",
    status: "Draft",
  },
  {
    id: 2,
    title: "Oliver Smith",
    date: "Sep 23, 2022",
    author: "William",
    category: "Romance",
    status: "Draft",
  },
  {
    id: 3,
    title: "Oliver Smith",
    date: "Sep 23, 2022",
    author: "William",
    category: "Romance",
    status: "Draft",
  },
  {
    id: 4,
    title: "Oliver Smith",
    date: "Sep 23, 2022",
    author: "William",
    category: "Romance",
    status: "Draft",
  },
  {
    id: 5,
    title: "Oliver Smith",
    date: "Sep 23, 2022",
    author: "William",
    category: "Romance",
    status: "Draft",
  },
  {
    id: 6,
    title: "Oliver Smith",
    date: "Sep 23, 2022",
    author: "William",
    category: "Romance",
    status: "Draft",
  },
  {
    id: 7,
    title: "Oliver Smith",
    date: "Sep 23, 2022",
    author: "William",
    category: "Romance",
    status: "Draft",
  },
  {
    id: 8,
    title: "Oliver Smith",
    date: "Sep 23, 2022",
    author: "William",
    category: "Romance",
    status: "Draft",
  },
];

export const CATEGORY_DATA = buildSelectOptions([
  "Getting Started",
  "Misc",
  "Security & Privacy",
]);

export const INITIAL_FORM_VALUES = {
  title: "",
  category: [],
  body: "",
};

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup
    .array(
      yup
        .object()
        .nullable()
        .shape({
          label: yup.string().oneOf(CATEGORY_DATA.map(cat => cat.label)),
          value: yup.string().oneOf(CATEGORY_DATA.map(cat => cat.value)),
        })
    )
    .min(1, "At least one category is required")
    .required("Category is required"),
  body: yup.string().required("Body is required"),
});
