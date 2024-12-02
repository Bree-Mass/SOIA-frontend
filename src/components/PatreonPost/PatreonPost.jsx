import iconLocked from "../../assets/icon-locked.png";
import "./PatreonPost.css";

const PatreonPost = ({ post }) => {
  return (
    <li className="book__patreon-post">
      <h2 className="patreon-post__title">{post.title}</h2>
      <div className="patreon-post__links">
        <a
          className="patreon-post__link"
          href={`https://www.patreon.com${post.url}`}
        >
          See it on Patreon
          {!post.is_public && (
            <img
              className="patreon-post__icon"
              src={iconLocked}
              alt="private icon"
            />
          )}
        </a>
      </div>
      <div className="patreon-post__content">{post.content}</div>
    </li>
  );
};

export default PatreonPost;
