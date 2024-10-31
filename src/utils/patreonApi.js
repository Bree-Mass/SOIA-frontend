const getPatreonPosts = () => {
  return fetch("http://localhost:3001/api/patreon")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then((posts) => {
      if (posts && posts.data) {
        return posts.data;
      }
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
};

export { getPatreonPosts };
