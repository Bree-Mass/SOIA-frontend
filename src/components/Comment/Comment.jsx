import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ModalsContext } from "../../contexts/ModalsContext";

import "./Comment.css";

const Comment = ({
  isLoggedIn,
  comment,
  commentName,
  commentPage,
  handleDelete,
  handleCommentToEdit,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const modalContext = React.useContext(ModalsContext);

  const handleOpenEditModal = (evt) => {
    handleCommentToEdit(comment);
    modalContext.openModals(evt);
  };

  return (
    <li className="comment">
      <div className="comment-wrapper">
        {commentName && <h3 className="comment__user">{comment.name}</h3>}
        {commentPage && <p className="comment__page">Page {comment.page}</p>}
        <p className="comment__body">{comment.comment}</p>
      </div>
      {isLoggedIn && comment.user === currentUser._id && (
        <div className="comment__buttons">
          <button
            className="comment__button comment__button_edit"
            id="comment-modal_edit"
            onClick={handleOpenEditModal}
          />
          <button
            className="comment__button comment__button_delete"
            onClick={() => handleDelete(comment._id)}
          />
        </div>
      )}
    </li>
  );
};

export default Comment;
