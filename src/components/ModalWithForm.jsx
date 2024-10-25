import Modal from "./Modal";
import "../blocks/ModalWithForm.css";

function ModalWithForm({
  children,
  titleText,
  buttonText,
  isOpen,
  isButtonDisabled,
  handleSubmit,
}) {
  return (
    <Modal titleText={titleText} isOpen={isOpen}>
      <form className="modal__form" onSubmit={handleSubmit}>
        {children}
        <button
          className="modal__submit-button"
          type="submit"
          disabled={isButtonDisabled}
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
