import { request } from "./api";

const signup = ({ name, email, password }) => {
  return request(`http://localhost:3001/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
};

const signin = ({ email, password }) => {
  return request(`http://localhost:3001/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

const authorizeToken = (token) => {
  return request(`http://localhost:3001/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export { signup, signin, authorizeToken };
