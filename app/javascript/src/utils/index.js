import dayjs from "dayjs";

const camelize = str =>
  str
    .toLowerCase()
    .replace(/([-][a-z0-9])|(\s[a-z0-9])/gi, m => m[1].toUpperCase());

export const buildSelectOptions = options =>
  options.map(option => ({ label: option, value: camelize(option) }));

export const formatCreatedTimeToDate = dateTime =>
  dayjs(dateTime).format("MMMM  D, YYYY");

export const filterData = (data, filter) => {
  Object.keys(filter).forEach(key => {
    if (filter[key] && typeof filter[key] === "string") {
      data = data.filter(item => item[key] === filter[key]);
    } else if (
      filter[key] &&
      typeof filter[key] === "object" &&
      filter[key].length > 0
    ) {
      data = data.filter(item => filter[key].includes(item[key]));
    }
  });

  return data;
};
