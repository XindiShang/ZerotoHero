import { useState } from 'react';
import "./post.scss";
import { MoreVert } from "@mui/icons-material";
import { Users } from '../../dummyData';

// the prop name "post" is derived from the component name "Post"
const Post = ({ post }) => {
  const user = Users.find(u => u.id === post.userId);
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={user.profilePicture}
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.photo} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="/assets/like.png" alt="" onClick={likeHandler} className="likeIcon" />
            <img src="/assets/heart.png" alt="" onClick={likeHandler} className="likeIcon" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
