import "./Book.css";

const Book = ({ bookNumber }) => {
  return <div className="book">{`You're on the Book ${bookNumber} page`}</div>;
};

export default Book;
