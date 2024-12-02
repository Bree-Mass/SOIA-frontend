import React from "react";

function useFormAndValidation(isOpen) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const handleChange = (evt) => {
    const { name, value, validationMessage, maxLength } = evt.target;
    const shortenedError = validationMessage.slice(0, 43);

    if (name === "comment" && value.length >= maxLength) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Message cannot exceed ${maxLength} characters.`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: shortenedError,
      }));
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    // setErrors({ ...errors, [name]: shortenedError });
    setIsValid(evt.target.closest("form").checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  React.useEffect(() => {
    setIsButtonDisabled(!isValid);
  }, [isValid]);

  React.useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    resetForm,
    isButtonDisabled,
    setIsButtonDisabled,
  };
}

export default useFormAndValidation;
