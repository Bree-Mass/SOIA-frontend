import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";

import "./ContactModal.css";

function ContactModal({ titleText, isOpen, isLoading, handleSubmit }) {
  const { values, handleChange, errors, isButtonDisabled } =
    useFormAndValidation(isOpen);

  return (
    <ModalWithForm
      titleText={titleText}
      buttonText={isLoading ? "Sending..." : "Send"}
      isOpen={isOpen}
      isButtonDisabled={isButtonDisabled}
      handleSubmit={handleSubmit}
      values={values}
    >
      <label
        className={`modal__label ${errors.email ? "modal__error" : ""}`}
        htmlFor="contact-email"
      >
        Your Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          id="contact-email"
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
        className={`modal__label ${errors.message ? "modal__error" : ""}`}
        htmlFor="contact-message"
      >
        Your Message*
        <textarea
          className="modal__input modal__input_message"
          type="text"
          name="message"
          id="contact-message"
          value={values.message || ""}
          placeholder="Message"
          minLength="1"
          maxLength="500"
          onChange={handleChange}
          required
        />
        <span
          className={`modal__validation ${
            errors.email ? "modal__validation_visible" : ""
          }`}
        >
          {errors.message}
        </span>
      </label>
    </ModalWithForm>
  );
}

export default ContactModal;
