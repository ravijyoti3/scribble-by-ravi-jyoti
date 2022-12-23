import { filter, pipe, toLower, includes, trim, prop } from "ramda";

export const searchCategory = (categoryList, searchCategory) =>
  filter(
    pipe(prop("name"), toLower, includes(pipe(toLower, trim)(searchCategory))),
    categoryList
  );
