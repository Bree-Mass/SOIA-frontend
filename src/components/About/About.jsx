import { getPatreonPosts } from "../../utils/patreonApi";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      About The Author Here
      <button className="about__button" onClick={getPatreonPosts}>
        Check API
      </button>
    </div>
  );
};

export default About;
