import { useEffect, useRef } from "react";

import dayjs from "dayjs";

const camelize = str =>
  str
    .toLowerCase()
    .replace(/([-][a-z0-9])|(\s[a-z0-9])/gi, m => m[1].toUpperCase());

export const buildSelectOptions = options =>
  options.map(option => ({ label: option, value: camelize(option) }));

export const formatCreatedTimeToDate = dateTime =>
  dayjs(dateTime).format("MMMM  D, YYYY");

export const useKey = (key, callback) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function handle(event) {
      if (event.key === key) {
        callbackRef.current(event);
      }
    }
    document.addEventListener("keydown", handle);

    return () => document.removeEventListener("keydown", handle);
  }, [key]);
};
