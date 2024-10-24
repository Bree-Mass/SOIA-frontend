import "../blocks/Modal.css";

const Modal = ({ children, titleText }) => {
  return (
    <div className="modal modal_opened">
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button
          className="modal__close-button"
          type="button"
          onClick={() => console.log("close")}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
