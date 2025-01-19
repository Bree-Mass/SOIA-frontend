import { request } from "./api";

const getPages = () => {
  return request("/google/api/google").then((data) => {
    return data.urls;
  });
};

export { getPages };
