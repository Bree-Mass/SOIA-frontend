import { request } from "./api";

const getPages = () => {
  return request("/api/google").then((data) => {
    return data.urls;
  });
};

export { getPages };
