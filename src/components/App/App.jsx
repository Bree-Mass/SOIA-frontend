import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Book from "../Book/Book";
import Profile from "../Profile/Profile";
import About from "../About/About";
import Store from "../Store/Store";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ContactModal from "../ContactModal/ContactModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { signup, signin, authorizeToken } from "../../utils/auth";
import { ModalsContext } from "../../contexts/ModalsContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getPatreonPosts } from "../../utils/patreonApi";
import { getPages } from "../../utils/googleApi";
import "./App.css";

function App() {
  //// USE STATES ////
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userToken, setUserToken] = React.useState("");
  const [userBookIndex, setUserBookIndex] = React.useState(0);
  const [bookPages, setBookPages] = React.useState([]);

  const [patreonPosts, setPatreonPosts] = React.useState({});

  //// HANDLE BOOK ////

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

  const handleRegistration = ({ email, password, name }) => {
    const requestRegistration = () => {
      return signup({ email, password, name }).then(() =>
        handleLogin({ email, password })
      );
    };
    handleSubmit(requestRegistration);
  };

  const handleLogin = ({ email, password }) => {
    const requestLogin = () => {
      return signin({ email, password })
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          setUserToken(res.token);
          return res.token;
        })
        .then((token) => {
          return authorizeToken(token);
        })
        .then((user) => {
          setCurrentUser(user.data);
          setIsLoggedIn(true);
        });
    };
    handleSubmit(requestLogin);
  };

  const handleEditProfile = ({ name }) => {
    const requestEditProfile = () => {
      // return patchUser({ name }, userToken).then((user) => {
      //   setCurrentUser(user.data);
      // });
    };
    handleSubmit(requestEditProfile);
  };

  const handleEditComment = ({ name }) => {
    const requestEditComment = () => {
      // return patchUser({ name}, userToken).then((user) => {
      //   setCurrentUser(user.data);
      // });
    };
    handleSubmit(requestEditComment);
  };

  const handleContact = ({ email, message }) => {
    const requestContact = () => {
      console.log("Submit Contact!");
      // return the contact method
    };
    handleSubmit(requestContact);
  };

  //// CHECK IF USER HAS TOKEN ON PAGE VISIT ////
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      authorizeToken(token)
        .then((res) => {
          setCurrentUser(res.data);
          setUserToken(token);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

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

  //// ON INITIAL PAGE LOAD USE EFFECTS ////

  React.useEffect(() => {
    getPatreonPosts().then((data) => {
      const extractedPosts = data.map((post) => ({
        content: post.attributes.content,
        title: post.attributes.title,
        url: post.attributes.url,
        is_public: post.attributes.is_public,
      }));
      const sortedPosts = extractedPosts.sort((a, b) => {
        return b.is_public - a.is_public;
      });

      setPatreonPosts(sortedPosts);
    });
  }, []);

  React.useEffect(() => {
    getPages().then((imageUrls) => {
      if (imageUrls && imageUrls.length > 0) {
        setBookPages(imageUrls);
      }
    });
  }, []);

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
                  <Route
                    path="/book1"
                    element={
                      <Book
                        bookNumber="1"
                        bookPages={bookPages}
                        userBookIndex={userBookIndex}
                      />
                    }
                  />
                  <Route
                    path="/book2"
                    element={
                      <Book bookNumber="2" patreonPosts={patreonPosts} />
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile setIsLoggedIn={setIsLoggedIn} />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="/store" element={<Store />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>

                <Footer />
              </div>
              <ContactModal
                titleText="Contact"
                isOpen={activeModal === "contact-modal"}
                isLoading={isLoading}
                handleSubmit={handleContact}
              />
              <LoginModal
                titleText="Login"
                isOpen={activeModal === "login-modal"}
                isLoading={isLoading}
                handleSubmit={handleLogin}
              />
              <RegisterModal
                titleText="Register"
                isOpen={activeModal === "register-modal"}
                isLoading={isLoading}
                handleSubmit={handleRegistration}
              />
            </CurrentUserContext.Provider>
          </ModalsContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
