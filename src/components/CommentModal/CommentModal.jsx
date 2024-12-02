import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import { ModalsContext } from "../../contexts/ModalsContext";

import "./CommentModal.css";

function CommentModal({
  titleText,
  isOpen,
  isLoading,
  handleAddComment,
  handleEditComment,
  commentToEdit,
}) {
  const modalContext = React.useContext(ModalsContext);
  const { values, setValues, handleChange, errors, isButtonDisabled } =
    useFormAndValidation(isOpen);

  React.useEffect(() => {
    if (commentToEdit) {
      setValues({ comment: commentToEdit.comment });
    }
  }, [commentToEdit]);

  return (
    <ModalWithForm
      titleText={titleText}
      isOpen={isOpen}
      handleSubmit={
        modalContext.activeModal === "comment-modal_edit"
          ? handleEditComment
          : handleAddComment
      }
      values={values}
    >
      <label
        className={`form__label ${errors.comment ? "form__error" : ""}`}
        htmlFor="comment-message"
      >
        <textarea
          className="form__input form__input_message"
          type="text"
          name="comment"
          id="comment-message"
          value={values.comment || ""}
          placeholder="Message"
          minLength="1"
          maxLength="500"
          onChange={handleChange}
          required
        />
        <span
          className={`form__validation ${
            errors.comment ? "form__validation_visible" : ""
          }`}
        >
          {errors.comment}
        </span>
      </label>
      <button
        className="form__submit-button"
        type="submit"
        disabled={isButtonDisabled}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </ModalWithForm>
  );
}

export default CommentModal;
