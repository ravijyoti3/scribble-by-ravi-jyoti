import dayjs from "dayjs";

const camelize = str =>
  str
    .toLowerCase()
    .replace(/([-][a-z0-9])|(\s[a-z0-9])/gi, m => m[1].toUpperCase());

export const buildSelectOptions = options =>
  options.map(option => ({ label: option, value: camelize(option) }));

export const formatCreatedTimeToDate = dateTime =>
  dayjs(dateTime).format("MMMM  D, YYYY");

export const formatCreatedTimeToDateAndTime = dateTime =>
  dayjs(dateTime).format("h:mm A, D/M/YYYY");

export const formatVisitedTimeToDate = dateTime =>
  dayjs(dateTime).format("YYYY-MM-DD");
