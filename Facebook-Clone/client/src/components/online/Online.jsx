import "./online.scss";

const Online = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
      <li className="online">
        <div className="onlineProfileImgContainer">
          <img
            className="onlineProfileImg"
            src={PF + user.profilePicture}
            alt=""
          />
          <span className="onlineBadge"></span>
        </div>
        <span className="onlineUsername">{user.username}</span>
      </li>
  );
};

export default Online;
