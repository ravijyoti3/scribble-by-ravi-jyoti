import { useEffect, useRef } from "react";

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
