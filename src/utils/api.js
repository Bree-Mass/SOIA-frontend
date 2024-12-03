const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.soia.home.kg"
    : "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const request = (path, options) => {
  return fetch(`${baseUrl}${path}`, options).then(checkResponse);
};

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    return new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        func(...args)
          .then(resolve)
          .catch(reject);
      }, delay);
    });
  };
}

export { request, debounce };
