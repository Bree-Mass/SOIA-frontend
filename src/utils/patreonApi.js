import { request } from "./api";

const getPatreonPosts = () => {
  return request("/api/patreon")
    .then((posts) => {
      return posts;
    })
    .catch((err) => {
      console.error(`Failed to fetch posts from Patreon API: ${err}`);
    });
};

export { getPatreonPosts };
