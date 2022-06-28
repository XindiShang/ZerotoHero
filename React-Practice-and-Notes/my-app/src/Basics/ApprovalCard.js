import React from "react";

const ApprovalCard = (props) => {
  // console.log(props); // children is an array
  // children: {
  //   $$typeof: Symbol(react.element),
  //   key: null,
  //   props: {author: 'Addison', text: 'How artistic!!!'},
  //   ref: null,
  //   type: props => {…},
  //   _owner: FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …},
  //   _store: {validated: true}
  // }
  const { children } = props;

  return (
    <div className="ui card">
      <div className="content">{children}</div>
      <div className="extra content">
        <div className="ui two buttons">
          <div className="ui basic green button">Approve</div>
          <div className="ui basic red button">Reject</div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalCard;
