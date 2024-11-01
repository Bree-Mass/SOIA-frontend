const getPages = () => {
  return fetch("http://localhost:3001/api/google")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      return data.urls;
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
};

export { getPages };
