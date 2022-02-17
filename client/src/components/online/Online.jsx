import "./Online.css";

const Online = ({user}) => {
  return (
    <li className="rightbar__friend">
      <div className="rightbar__profile-img-container">
        <img className="rightbar__profile-img" src={user.profilePicture} alt="" />
        <span className="rightbar__online"/>
      </div>
      <span className="rightbar__username">{user.username}</span>
    </li>
  );
}

export default Online;