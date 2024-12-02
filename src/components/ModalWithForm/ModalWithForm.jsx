import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import "./ModalWithForm.css";

function ModalWithForm({ children, titleText, isOpen, handleSubmit, values }) {
  return (
    <Modal titleText={titleText} isOpen={isOpen}>
      <Form handleSubmit={handleSubmit} values={values}>
        {children}
      </Form>
    </Modal>
  );
}

export default ModalWithForm;
