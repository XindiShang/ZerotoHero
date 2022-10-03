import { useState, useEffect } from "react";
import "./feed.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";

const id = "630e068df8b18d243bb1eb0e";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`posts/timeline/${id}`);
      setPosts(res.data)
    };
    fetchPosts();
  }, []);

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
