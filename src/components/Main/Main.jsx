import bookCover from "../../assets/book-cover_colored.avif";
import "./Main.css";

const Main = () => {
  return (
    <main className="main">
      <img className="main__book-cover" src={bookCover} />
    </main>
  );
};

export default Main;
