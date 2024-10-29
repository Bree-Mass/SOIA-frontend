import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Book from "../Book/Book";
import Profile from "../Profile/Profile";
import Store from "../Store/Store";
import Footer from "../Footer/Footer";
import ContactModal from "../ContactModal/ContactModal"; // remove this later because you will use this as Higher Order Component
import LoginModal from "../LoginModal/LoginModal";
import { ModalsContext } from "../../contexts/ModalsContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./App.css";

function App() {
  //// USE STATES ////
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [activeModal, setActiveModal] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);

  //// DEFAULT SUBMIT ////

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeModals)
      .catch(console.error)
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      });
  }

  // SUBMISSION FIELDS //

  const handleRegistration = ({ email, password, name, avatar }) => {
    const requestRegistration = () => {
      // return signup({ email, password, name, avatar }).then(() =>
      //   handleLogin({ email, password })
      // );
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = ({ email, password }) => {
    const requestLogin = () => {
      // return signin({ email, password })
      //   .then((res) => {
      //     localStorage.setItem("jwt", res.token);
      //     setUserToken(res.token);
      //     return res.token;
      //   })
      //   .then((token) => {
      //     return authorizeToken(token);
      //   })
      //   .then((user) => {
      //     setCurrentUser(user.data);
      //     setIsLoggedIn(true);
      //   });
    };
    handleSubmit(makeRequest);
  };

  const handleEditProfile = ({ name, avatar }) => {
    const requestEditProfile = () => {
      // return patchUser({ name, avatar }, userToken).then((user) => {
      //   setCurrentUser(user.data);
      // });
    };
    handleSubmit(makeRequest);
  };

  const handleEditComment = ({ name, avatar }) => {
    const requestEditComment = () => {
      // return patchUser({ name, avatar }, userToken).then((user) => {
      //   setCurrentUser(user.data);
      // });
    };
    handleSubmit(makeRequest);
  };

  const handleContact = ({ email, message }) => {
    const requestContact = () => {
      console.log("Submit Contact!");
      // return the contact method
    };
    handleSubmit(requestContact);
  };

  //// MODALS ////
  const openModals = (evt) => {
    setActiveModal(evt.target.id);
  };

  const closeModals = () => {
    setActiveModal(null);
    // set timeout so card wont visually change before the modal fades away
    setTimeout(() => {}, 400);
  };

  React.useEffect(() => {
    // sets/removes event listeners whenever a modal is opened/closed
    const handleOutsideClick = (evt) => {
      console.log(evt.target);
      if (evt.target.id === activeModal) {
        closeModals();
      }
    };
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeModals();
      }
    };

    if (activeModal) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscClose);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [activeModal]);

  return (
    <>
      <BrowserRouter>
        <div className="page">
          <ModalsContext.Provider
            value={{ activeModal, openModals, closeModals }}
          >
            <CurrentUserContext.Provider value={{ currentUser }}>
              <div className="page__content">
                <Header isLoggedIn={isLoggedIn} />
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/book1" element={<Book bookNumber="1" />} />
                  <Route path="/book2" element={<Book bookNumber="2" />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/store" element={<Store />} />
                </Routes>

                <Footer />
              </div>
              <ContactModal
                titleText="Contact Title"
                isOpen={activeModal === "contact-modal"}
                isLoading={isLoading}
                handleSubmit={handleContact}
              />
              <LoginModal
                titleText="Login Title"
                isOpen={activeModal === "login-modal"}
                isLoading={isLoading}
                handleSubmit={handleLogin}
              />
            </CurrentUserContext.Provider>
          </ModalsContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
