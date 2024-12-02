import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import { ModalsContext } from "../../contexts/ModalsContext";

import "./RegisterModal.css";

function RegisterModal({ titleText, isOpen, isLoading, handleSubmit }) {
  const modalContext = React.useContext(ModalsContext);
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
        className={`form__label ${errors.email ? "form__error" : ""}`}
        htmlFor="register-email"
      >
        <input
          className="form__input"
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
          className={`form__validation ${
            errors.email ? "form__validation_visible" : ""
          }`}
        >
          {errors.email}
        </span>
      </label>
      <label
        className={`form__label ${errors.password ? "form__error" : ""}`}
        htmlFor="register-password"
      >
        <input
          className="form__input"
          type="password"
          name="password"
          id="register-password"
          value={values.password || ""}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <span
          className={`form__validation ${
            errors.password ? "form__validation_visible" : ""
          } form__validation_register-password`}
        >
          {errors.password}
        </span>
      </label>
      <label
        className={`form__label ${errors.name ? "form__error" : ""}`}
        htmlFor="register-name"
      >
        <input
          className="form__input form__input_name"
          type="text"
          name="name"
          id="register-name"
          value={values.name || ""}
          placeholder="Name"
          minLength="1"
          maxLength="16"
          onChange={handleChange}
          required
        />
        <span
          className={`form__validation ${
            errors.name ? "form__validation_visible" : ""
          }`}
        >
          {errors.name}
        </span>
      </label>
      <div className="form__buttons">
        <button
          className="form__submit-button"
          type="submit"
          disabled={isButtonDisabled}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        or
        <button
          className="form__submit-button"
          type="button"
          id="login-modal"
          onClick={modalContext.openModals}
        >
          Login
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
