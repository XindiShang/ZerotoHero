// Import the React and ReactDOM libraries
import React from "react";
import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";

// Create a react component
const Basics = () => {
  // JSX
  // Note: can't put <div> tag in new line, otherwise the function will return nothing
  // return <div></div>;
  return (
    <div>
      <form>
        <label htmlFor="name">Enter Name:</label>
        <input type="text" id="name" />
        <button
          className="btn"
          style={{ backgroundColor: "lightblue", color: "white" }}
        >
          Submit
        </button>
      </form>

      <div className="ui container comments">
        <ApprovalCard>
          <CommentDetail author="Addison" text="How artistic!!!" />
        </ApprovalCard>
      </div>
    </div>
  );
};

export default Basics;