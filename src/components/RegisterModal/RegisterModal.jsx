import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import "./RegisterModal.css";

function RegisterModal({ titleText, isOpen, isLoading, handleSubmit }) {
  const { values, handleChange, errors, isButtonDisabled } =
    useFormAndValidation(isOpen);

  return (
    <ModalWithForm
      titleText={titleText}
      buttonText={isLoading ? "Registering..." : "Register"}
      isOpen={isOpen}
      isButtonDisabled={isButtonDisabled}
      handleSubmit={handleSubmit}
      values={values}
    >
      <label
        className={`modal__label ${errors.email ? "modal__error" : ""}`}
        htmlFor="register-email"
      >
        Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          id="register-email"
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
        htmlFor="register-password"
      >
        Password*
        <input
          className="modal__input"
          type="password"
          name="password"
          id="register-password"
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
      <label
        className={`modal__label ${errors.name ? "modal__error" : ""}`}
        htmlFor="register-name"
      >
        Name*
        <input
          className="modal__input modal__input_name"
          type="text"
          name="name"
          id="register-name"
          value={values.name || ""}
          placeholder="Name"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.name ? "modal__validation_visible" : ""
          }`}
        >
          ({errors.name})
        </span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
