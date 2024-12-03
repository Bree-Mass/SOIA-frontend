import { request, debounce } from "./api";

const patchUser = debounce((data, token) => {
  return request(`/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}, 500);

const createComment = ({ name, comment, page }, token) => {
  return request(`/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, comment, page }),
  });
};

const patchComment = ({ comment, _id }, token) => {
  return request(`/comments/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
  });
};

const deleteComment = (_id, token) => {
  return request(`/comments/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

const getUserComments = debounce((token) => {
  return request(`/comments/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}, 500);

const getPageComments = debounce((page) => {
  return request(`/comments/page/${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}, 500);

export {
  patchUser,
  createComment,
  patchComment,
  deleteComment,
  getUserComments,
  getPageComments,
};
