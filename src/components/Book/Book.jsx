import React from "react";
import Pagination from "../Pagination/Pagination";
import Preloader from "../Preloader/Preloader";
import Comment from "../Comment/Comment";
import PatreonPost from "../PatreonPost/PatreonPost";
import { ModalsContext } from "../../contexts/ModalsContext";
import "./Book.css";

const Book = ({
  isLoggedIn,
  patreonPosts,
  pageComments,
  bookPages,
  userBookIndex,
  handlePageChange,
  handleDelete,
  handleCommentToEdit,
}) => {
  const modalContext = React.useContext(ModalsContext);
  const [isBookLoading, setIsBookLoading] = React.useState(true);
  const [postsToLoad, setPostsToLoad] = React.useState(10);
  const [commentsToLoad, setCommentsToLoad] = React.useState(10);

  const loadMorePosts = () => {
    if (postsToLoad < patreonPosts.length) {
      setPostsToLoad((prev) => prev + 10);
    }
  };

  const loadMoreComments = () => {
    if (commentsToLoad < pageComments.length) {
      setCommentsToLoad((prev) => prev + 10);
    }
  };

  React.useEffect(() => {
    if (bookPages) {
      setIsBookLoading(true);
      const image = new Image();
      image.src = bookPages[userBookIndex];
      image.onload = () => {
        setIsBookLoading(false);
      };
      image.onerror = () => {
        setIsBookLoading(false);
      };
      return () => {
        image.onload = null;
        image.onerror = null;
      };
    }
  }, [userBookIndex]);

  React.useEffect(() => {
    setPostsToLoad(10);
    setCommentsToLoad(10);
  }, [patreonPosts, pageComments]);

  return (
    <div className="book">
      {bookPages && (
        <>
          <div className="book__container">
            {isBookLoading && <Preloader />}
            <div className="book__page-wrapper">
              {isBookLoading && <div className="book__page-mask"></div>}
              <img
                className="book__page"
                src={bookPages[userBookIndex]}
                alt={`Page ${userBookIndex + 1}`}
              />
            </div>

            <Pagination
              totalPages={bookPages.length - 1}
              currentPage={userBookIndex}
              onPageChange={handlePageChange}
              isModalOpen={modalContext.activeModal}
            />
            {isLoggedIn && (
              <button
                className="book__add-comment_button"
                type="button"
                id="comment-modal"
                onClick={modalContext.openModals}
              >
                Add Comment
              </button>
            )}
          </div>
          {pageComments && pageComments.length > 0 && (
            <>
              <ul className="book__comments-list">
                {pageComments.slice(0, commentsToLoad).map((comment, index) => (
                  <Comment
                    key={index}
                    isLoggedIn={isLoggedIn}
                    comment={comment}
                    commentName={true}
                    handleDelete={handleDelete}
                    handleCommentToEdit={handleCommentToEdit}
                  />
                ))}
              </ul>
              {commentsToLoad <= pageComments.length && (
                <button
                  onClick={loadMoreComments}
                  className="book__load-button"
                >
                  More Comments
                </button>
              )}
            </>
          )}
        </>
      )}

      {patreonPosts &&
        (patreonPosts.length > 0 ? (
          <>
            <ul className="book__patreon-list">
              {patreonPosts.slice(0, postsToLoad).map((post, index) => (
                <PatreonPost key={index} post={post} />
              ))}
            </ul>
            {postsToLoad <= patreonPosts.length && (
              <button onClick={loadMorePosts} className="book__load-button">
                More Posts
              </button>
            )}
          </>
        ) : (
          <Preloader />
        ))}
    </div>
  );
};

export default Book;
