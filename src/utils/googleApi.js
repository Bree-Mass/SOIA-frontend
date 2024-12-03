import { request } from "./api";

const getPages = () => {
  return request("/api/google")
    .then((data) => {
      return data.urls;
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
};

export { getPages };
