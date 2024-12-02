import "./Preloader.css";

const Preloader = ({}) => {
  return (
    <div className="preloader">
      <div className="preloader__image"></div>
      <svg
        className="preloader__text"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <path
          id="curve"
          d="M 10,60 Q 45,35 85,80"
          fill="transparent"
          stroke="transparent"
        />
        <text fill="white">
          <textPath href="#curve">Loading...</textPath>
        </text>
      </svg>
    </div>
  );
};

export default Preloader;
