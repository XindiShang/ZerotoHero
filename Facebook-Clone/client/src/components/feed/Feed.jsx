import { useState, useEffect, useContext } from "react";
import "./feed.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import request from "../../utils/request";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await request.get(`/posts/profile/${username}`)
        : await request.get(`/posts/timeline/${user._id}`);
      setPosts(res.data);
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
