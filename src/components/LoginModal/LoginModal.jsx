import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import { ModalsContext } from "../../contexts/ModalsContext";
import "./LoginModal.css";

function LoginModal({ titleText, isOpen, isLoading, handleSubmit }) {
  const modalContext = React.useContext(ModalsContext);
  const { values, handleChange, errors, isButtonDisabled } =
    useFormAndValidation(isOpen);

  return (
    <ModalWithForm
      titleText={titleText}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
      values={values}
    >
      <label
        className={`form__label ${errors.email ? "form__error" : ""}`}
        htmlFor="login-email"
      >
        <input
          className="form__input"
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
          className={`form__validation ${
            errors.email ? "form__validation_visible" : ""
          }`}
        >
          {errors.email}
        </span>
      </label>
      <label
        className={`form__label ${errors.password ? "form__error" : ""}`}
        htmlFor="login-password"
      >
        <input
          className="form__input"
          type="password"
          name="password"
          id="login-password"
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
      <div className="form__buttons">
        <button
          className="form__submit-button"
          type="submit"
          disabled={isButtonDisabled}
        >
          {isLoading ? "Logging In..." : "Login"}
        </button>
        or
        <button
          className="form__submit-button"
          type="button"
          id="register-modal"
          onClick={modalContext.openModals}
        >
          Register
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
