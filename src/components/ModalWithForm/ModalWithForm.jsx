import React from "react";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import "./ModalWithForm.css";

function ModalWithForm({ children, titleText, isOpen, handleSubmit, values }) {
  return (
    <Modal titleText={titleText} isOpen={isOpen}>
      <Form children={children} handleSubmit={handleSubmit} values={values} />
    </Modal>
  );
}

export default ModalWithForm;
