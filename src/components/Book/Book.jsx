import React from "react";
import Preloader from "../Preloader/Preloader";
import PatreonPost from "../PatreonPost/PatreonPost";

import "./Book.css";

const Book = ({ bookNumber, patreonPosts, bookPages, userBookIndex }) => {
  const [bookIndex, setBookIndex] = React.useState(userBookIndex);
  let currentPage = bookPages[bookIndex];

  const goToNextPage = () => {
    setBookIndex((prevBookIndex) =>
      Math.min(prevBookIndex + 1, bookPages.length - 1)
    );
    console.log(bookIndex);
  };
  const goToPreviousPage = () => {
    setBookIndex((prevBookIndex) => Math.max(prevBookIndex - 1, 0));
    console.log(bookIndex);
  };

  return (
    <div className="book">
      <div>{`You're on the Book ${bookNumber} page`}</div>
      <div className="book__container">
        <button
          className="book__button"
          onClick={goToPreviousPage}
          disabled={bookIndex === 0}
        >
          Previous Page
        </button>
        <img className="book__page" src={currentPage} />
        <button
          className="book__button"
          onClick={goToNextPage}
          disabled={bookIndex === bookPages.length - 1}
        >
          Next Page
        </button>
      </div>

      {patreonPosts ? (
        patreonPosts.length > 0 ? (
          patreonPosts.map((post, index) => (
            <PatreonPost key={index} post={post} />
          ))
        ) : (
          <Preloader />
        )
      ) : null}
    </div>
  );
};

export default Book;
