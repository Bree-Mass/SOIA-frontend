import "./Profile.css";

const Profile = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };
  return (
    <div className="profile">
      You're on the Profile page
      <button className="about__button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
