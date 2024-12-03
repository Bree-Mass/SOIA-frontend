import { request } from "./api";

const getPatreonPosts = () => {
  return request("/api/patreon")
    .then((posts) => {
      return posts;
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
};

export { getPatreonPosts };
