import { request } from "./api";

const getPatreonPosts = () => {
  return request("/patreon/api/patreon").then((posts) => {
    return posts;
  });
};

export { getPatreonPosts };
