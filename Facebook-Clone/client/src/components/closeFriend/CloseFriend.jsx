import "./closeFriend.scss";

const CloseFriend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="closeFriend">
      <img src={PF + user.profilePicture} alt="" className="closeFriendImg" />
      <span className="closeFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
