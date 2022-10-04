import { useState, useEffect } from "react";
import "./feed.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import request from "../../utils/request";

const id = "630e068df8b18d243bb1eb0e";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await request.get(`/posts/profile/${username}`)
        : await request.get(`/posts/timeline/${id}`);
      setPosts(res.data);
    };
    fetchPosts();
  }, [username]);

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
