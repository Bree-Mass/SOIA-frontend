import { request } from "./api";

const getPatreonPosts = () => {
  return request("/api/patreon").then((posts) => {
    return posts;
  });
};

export { getPatreonPosts };
