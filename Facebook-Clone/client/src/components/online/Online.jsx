import "./online.scss";

const Online = ({ user }) => {
  return (
      <li className="online">
        <div className="onlineProfileImgContainer">
          <img
            className="onlineProfileImg"
            src={user.profilePicture}
            alt=""
          />
          <span className="onlineBadge"></span>
        </div>
        <span className="onlineUsername">{user.username}</span>
      </li>
  );
};

export default Online;
