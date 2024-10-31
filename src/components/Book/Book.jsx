import Preloader from "../Preloader/Preloader";
import PatreonPost from "../PatreonPost/PatreonPost";
import "./Book.css";

const Book = ({ bookNumber, patreonPosts }) => {
  return (
    <div className="book">
      <div>{`You're on the Book ${bookNumber} page`}</div>

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
