import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import "./LoginModal.css";

function LoginModal({ titleText, isOpen, isLoading, handleSubmit }) {
  const { values, handleChange, errors, isButtonDisabled } =
    useFormAndValidation(isOpen);

  return (
    <ModalWithForm
      titleText={titleText}
      buttonText={isLoading ? "Logging In..." : "Log In"}
      isOpen={isOpen}
      isButtonDisabled={isButtonDisabled}
      handleSubmit={handleSubmit}
    >
      <label
        className={`modal__label ${errors.email ? "modal__error" : ""}`}
        htmlFor="login-email"
      >
        Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          id="login-email"
          value={values.email || ""}
          placeholder="Email"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.email ? "modal__validation_visible" : ""
          }`}
        >
          {errors.email}
        </span>
      </label>
      <label
        className={`modal__label ${errors.password ? "modal__error" : ""}`}
        htmlFor="login-password"
      >
        Password*
        <input
          className="modal__input"
          type="password"
          name="password"
          id="login-password"
          value={values.password || ""}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.password ? "modal__validation_visible" : ""
          } modal__validation_register-password`}
        >
          {errors.password}
        </span>
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
