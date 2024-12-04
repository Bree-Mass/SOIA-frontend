import "./Form.css";

function Form({ children, handleSubmit, values }) {
  return (
    <form
      className="form"
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(values);
      }}
    >
      {children}
    </form>
  );
}

export default Form;
