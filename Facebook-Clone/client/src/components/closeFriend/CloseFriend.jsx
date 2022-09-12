import "./closeFriend.scss";

const CloseFriend = ({ user }) => {
  return (
    <li className="closeFriend">
      <img src={user.profilePicture} alt="" className="closeFriendImg" />
      <span className="closeFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
