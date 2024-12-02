const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
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
