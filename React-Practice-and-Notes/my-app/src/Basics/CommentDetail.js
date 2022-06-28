import React from "react";
import faker from "faker";

const CommentDetail = (props) => {
  // console.log(props); // {author: 'Addison'}
  const { author, text } = props;
  const getTime = () => {
    return new Date().toLocaleTimeString();
  };
  return (
    <div className="comment">
      <a className="avatar">
        <img src={faker.image.image()} />
      </a>
      <div className="content">
        <a className="author">{author}</a>
        <div className="metadata">
          <span className="date">Today at {getTime()}</span>
        </div>
        <div className="text">{text}</div>
      </div>
    </div>
  );
};

export default CommentDetail;
