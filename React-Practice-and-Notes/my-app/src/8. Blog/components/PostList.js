import React from "react";
import { connect } from "react-redux";
import { fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPostsAndUsers();
  }

  renderList() {
    const { posts } = this.props;
    return posts.length === 0 ? <div>Post List</div> : (
      posts.map(post => {
        return (
          <div className="item" key={post.id}>
            <i className="large middle aligned icon user" />
            <div className="content">
              <div className="description">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
              <UserHeader id={post.userId} />
            </div>
        </div>);
      })
    )
  }

  render() {
    return (
      <div className="ui relaxed divided list">{this.renderList()} </div>)
    // return <div>hi</div>
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, {
  fetchPostsAndUsers
})(PostList);