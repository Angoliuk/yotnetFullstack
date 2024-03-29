import { useState, useCallback } from "react";
import axios from "axios";

export const useHttp = () => {
  const [xTotalCount, setXTotalCount] = useState(0);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        const response = await axios({
          url,
          method,
          baseURL: "http://localhost:5000",
          headers,
          data: body,
        }).catch((e) => {
          console.log(e);
          if (e.response) {
            console.log(e.response);
            throw new Error(
              e.response.data
                ? e.response.data.message
                  ? e.response.data.message
                  : e.response.data.join(". ")
                : e.response.status + ". " + e.response.statusText
            );
          } else if (e.request) {
            throw new Error(
              e.request.data
                ? e.request.data.message
                  ? e.request.data.message
                  : e.request.data.join(". ")
                : e.request.status + ". " + e.request.statusText
            );
          } else {
            throw new Error(
              e.status && e.statusText
                ? e.status + ". " + e.statusText
                : "Unknown error"
            );
          }
        });
        return response.data;
      } catch (e) {
        throw e;
      }
    },
    []
  );

  return { request, xTotalCount };
};
