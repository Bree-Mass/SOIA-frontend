import { request } from "./api";

const getPages = () => {
  return request("/api/google")
    .then((data) => {
      return data.urls;
    })
    .catch((err) => {
      console.error(`Failed to fetch pages from Google API: ${err}`);
    });
};

export { getPages };
