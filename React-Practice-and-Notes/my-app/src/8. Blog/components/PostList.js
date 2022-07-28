import React from "react";
import { connect } from "react-redux";
import { fetchPost } from "../actions";

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPost();
  }

  render() {
    const { posts } = this.props;
    console.log(posts)
    return posts.length === 0 ? <div>Post List</div> : (
      posts.map(post => {
        return (<div key={post.id}>
          <h3>Post ID: {post.id}</h3>
          <p>Title: {post.title}</p>
          <p>Content: {post.body}</p>
        </div>);
      })
    )
    // return <div>hi</div>
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, {
  fetchPost
})(PostList);