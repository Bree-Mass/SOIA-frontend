import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Comment from "../Comment/Comment";
import Form from "../Form/Form";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import "./Profile.css";

const Profile = ({
  userComments,
  handleLogout,
  isLoading,
  handleSubmit,
  handleDelete,
  handleCommentToEdit,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [isUpdateActive, setIsUpdateActive] = React.useState(false);
  const currentLocation = useLocation();
  const {
    values,
    setValues,
    handleChange,
    errors,
    resetForm,
    isValid,
    isButtonDisabled,
    setIsButtonDisabled,
  } = useFormAndValidation();

  const handleFormSubmit = () => {
    handleSubmit(values)
      .then(() => {
        setIsUpdateActive(false);
        resetForm();
      })
      .catch(console.error);
  };

  React.useEffect(() => {
    resetForm();
    setValues({ name: currentUser.name, email: currentUser.email });
    setIsUpdateActive(false);
  }, [currentUser, currentLocation]);

  React.useEffect(() => {
    if (
      values.name === currentUser.name &&
      values.email === currentUser.email
    ) {
      setIsButtonDisabled(true);
    } else if (isValid) {
      setIsButtonDisabled(false);
    }
  }, [values]);

  return (
    <section className="profile">
      <Sidebar handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="info" replace />} />
        <Route
          path="info"
          element={
            <Form handleSubmit={handleFormSubmit} values={values}>
              <label
                className={`form__label ${errors.name ? "form__error" : ""}`}
                htmlFor="update-name"
              >
                Username*
                <input
                  className="form__input form__input_profile"
                  type="text"
                  name="name"
                  id="update-name"
                  value={values.name || ""}
                  placeholder={currentUser.name}
                  minLength="1"
                  maxLength="16"
                  onChange={handleChange}
                  disabled={!isUpdateActive}
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
              <label
                className={`form__label ${errors.email ? "form__error" : ""}`}
                htmlFor="update-email"
              >
                Email*
                <input
                  className="form__input form__input_profile"
                  type="email"
                  name="email"
                  id="update-email"
                  value={values.email || ""}
                  placeholder="Email"
                  minLength="1"
                  maxLength="30"
                  onChange={handleChange}
                  disabled={!isUpdateActive}
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
              <label className="form__label" htmlFor="info-page">
                Last page read:
                <span className="form__info" id="info-page">
                  {currentUser.page + 1}
                </span>
              </label>

              {isUpdateActive && (
                <div className="form__buttons">
                  <button
                    className="form__submit-button form__submit-button_light"
                    type="submit"
                    disabled={isButtonDisabled}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                  <button
                    className="form__submit-button form__submit-button_light"
                    type="button"
                    onClick={() => {
                      resetForm();
                      setValues({
                        name: currentUser.name,
                        email: currentUser.email,
                      });
                      setIsUpdateActive(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {!isUpdateActive && (
                <button
                  className="form__submit-button form__submit-button_light"
                  type="button"
                  onClick={() => {
                    setIsUpdateActive(true);
                  }}
                >
                  Update Info
                </button>
              )}
            </Form>
          }
        />
        <Route
          path="comments"
          element={
            userComments &&
            userComments.length > 0 && (
              <div className="profile__comments-wrapper">
                <h2 className="profile__comments-title">My Comments</h2>
                <ul className="book__comments-list">
                  {userComments.map((comment, index) => (
                    <Comment
                      key={index}
                      comment={comment}
                      commentPage={true}
                      handleDelete={handleDelete}
                      handleCommentToEdit={handleCommentToEdit}
                    />
                  ))}
                </ul>
              </div>
            )
          }
        />
      </Routes>
    </section>
  );
};

export default Profile;
