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
import CommentModal from "../CommentModal/CommentModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { signup, signin, authorizeToken } from "../../utils/auth";
import {
  patchUser,
  createComment,
  patchComment,
  deleteComment,
  getUserComments,
  getPageComments,
} from "../../utils/backendApi";
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
  const [patreonPosts, setPatreonPosts] = React.useState([]);
  const [userComments, setUserComments] = React.useState([]);
  const [pageComments, setPageComments] = React.useState([]);
  const [commentToEdit, setCommentToEdit] = React.useState(null);

  //// DEFAULT SUBMIT ////

  function handleSubmit(request) {
    setIsLoading(true);
    return request()
      .then(closeModals)
      .catch(console.error)
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      });
  }

  //// API REQUEST HANDLERS ////

  // User Handlers //
  const handleRegistration = ({ email, password, name }) => {
    const requestRegistration = () => {
      return signup({ email, password, name }).then(() =>
        handleLogin({ email, password })
      );
    };
    return handleSubmit(requestRegistration);
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
          setUserBookIndex(user.data.page);
          setIsLoggedIn(true);
        });
    };
    return handleSubmit(requestLogin);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserToken("");
  };

  const handleEditProfile = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== undefined && value !== currentUser[key]
      )
    );
    const requestEditProfile = () => {
      return patchUser(filteredData, userToken).then((user) => {
        setCurrentUser(user.data);
        if (filteredData.name) {
          handleGetPageComments(userBookIndex + 1);
        }
      });
    };

    return handleSubmit(requestEditProfile);
  };
  // Comment Handlers //
  const handleAddComment = ({ comment }) => {
    const requestAddComment = () => {
      return createComment(
        { name: currentUser.name, comment, page: userBookIndex + 1 },
        userToken
      )
        .then((post) => {
          setPageComments([...pageComments, post]);
          setUserComments([...userComments, post]);
        })

        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    };

    return handleSubmit(requestAddComment);
  };

  const handleEditComment = ({ comment }) => {
    const requestEditComment = () => {
      return patchComment({ comment, _id: commentToEdit._id }, userToken)
        .then((comment) => {
          const updateComments = (commentsArray, updatedComment) => {
            return commentsArray.map((comment) =>
              comment._id === updatedComment._id
                ? { ...comment, comment: updatedComment.comment }
                : comment
            );
          };
          setPageComments((prevPageComments) =>
            updateComments(prevPageComments, comment)
          );
          setUserComments((prevUserComments) =>
            updateComments(prevUserComments, comment)
          );
        })
        .catch((error) => {
          console.error("Error editing comment:", error);
        });
    };
    return handleSubmit(requestEditComment);
  };

  const handleDeleteComment = (_id) => {
    const requestDeleteComment = () => {
      return deleteComment(_id, userToken)
        .then(() => {
          setPageComments((prevComments) =>
            prevComments.filter((removedCom) => removedCom._id !== _id)
          );
          setUserComments((prevComments) =>
            prevComments.filter((removedCom) => removedCom._id !== _id)
          );
        })
        .catch((error) => {
          console.error("Error deleteing comment:", error);
        });
    };
    return handleSubmit(requestDeleteComment);
  };

  const handleGetUserComments = () => {
    const requestGetUserComments = () => {
      return getUserComments(userToken)
        .then((comments) => {
          setUserComments(comments.data);
        })
        .catch((error) => {
          console.error("Error getting comments:", error);
        });
    };
    return handleSubmit(requestGetUserComments);
  };

  const handleGetPageComments = (page) => {
    const requestGetPageComments = () => {
      return getPageComments(page)
        .then((comments) => {
          setPageComments(comments.data);
        })
        .catch((error) => {
          console.error("Error getting comments:", error);
        });
    };
    return handleSubmit(requestGetPageComments);
  };

  // 3rd Party Handlers //

  const handleGetPatreonPosts = () => {
    const requestGetPatreonPosts = () => {
      return getPatreonPosts()
        .then((data) => {
          const extractedPosts = data.map((post) => ({
            content: `${post.attributes.content}`,
            title: post.attributes.title,
            url: post.attributes.url,
            is_public: post.attributes.is_public,
          }));
          const sortedPosts = extractedPosts.sort((a, b) => {
            return b.is_public - a.is_public;
          });

          setPatreonPosts(sortedPosts);
        })
        .catch((error) => {
          console.error("Error getting Patreon posts:", error);
        });
    };

    return handleSubmit(requestGetPatreonPosts);
  };

  const handleGetBookPages = () => {
    const requestGetBookPages = () => {
      return getPages()
        .then((imageUrls) => {
          if (imageUrls && imageUrls.length > 0) {
            setBookPages(imageUrls);
          }
        })
        .catch((error) => {
          console.error("Error getting Patreon posts:", error);
        });
    };

    return handleSubmit(requestGetBookPages);
  };

  //// HANDLE BOOKS ////

  const handlePageChange = (newPageIndex) => {
    setUserBookIndex(newPageIndex);
    if (isLoggedIn) {
      return handleEditProfile({ page: newPageIndex });
    }
  };

  //// MODALS ////
  const openModals = (evt) => {
    setActiveModal(evt.target.id);
  };

  const closeModals = () => {
    setActiveModal(null);
    if (commentToEdit) {
      setCommentToEdit(null);
    }

    // set timeout so card wont visually change before the modal fades away
    setTimeout(() => {}, 400);
  };

  // sets/removes event listeners whenever a modal is opened/closed
  React.useEffect(() => {
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
  }, [activeModal, closeModals]);

  //// USE EFFECTS ////

  // Check if user has token //
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      authorizeToken(token)
        .then((res) => {
          setCurrentUser(res.data);
          setUserBookIndex(res.data.page);
          setUserToken(token);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) handleGetUserComments();
  }, [isLoggedIn]);

  React.useEffect(() => {
    handleGetPatreonPosts();
  }, []);

  React.useEffect(() => {
    handleGetBookPages();
  }, []);

  React.useEffect(() => {
    handleGetPageComments(userBookIndex + 1);
  }, [userBookIndex]);

  return (
    <>
      <BrowserRouter>
        <div className="page">
          <ModalsContext.Provider
            value={{ activeModal, openModals, closeModals }}
          >
            <CurrentUserContext.Provider value={currentUser}>
              <div className="page__content">
                <Header isLoggedIn={isLoggedIn} />

                <div className="page__content_main">
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route
                      path="/book1"
                      element={
                        <Book
                          pageComments={pageComments}
                          bookPages={bookPages}
                          userBookIndex={userBookIndex}
                          handlePageChange={handlePageChange}
                          handleDelete={handleDeleteComment}
                          handleCommentToEdit={setCommentToEdit}
                        />
                      }
                    />
                    <Route
                      path="/book2"
                      element={<Book patreonPosts={patreonPosts} />}
                    />

                    <Route
                      path="/profile/*"
                      element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                          <Profile
                            userComments={userComments}
                            handleLogout={handleLogout}
                            isLoading={isLoading}
                            handleSubmit={handleEditProfile}
                            handleDelete={handleDeleteComment}
                            handleCommentToEdit={setCommentToEdit}
                          />
                        </ProtectedRoute>
                      }
                    />

                    <Route path="/store" element={<Store />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </div>
                <Footer />
              </div>

              <CommentModal
                titleText="Comment"
                isOpen={
                  activeModal === "comment-modal" ||
                  activeModal === "comment-modal_edit"
                }
                isLoading={isLoading}
                handleAddComment={handleAddComment}
                handleEditComment={handleEditComment}
                commentToEdit={commentToEdit}
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
