import React, { useState } from "react";

const Accordion = (props) => {
  // only works in initialization
  const [activeIndex, setActiveIndex] = useState(null);

  // use callback to pass in parameter
  const onTitleClick = (idx) => {
    setActiveIndex(idx);
  };

  const items = props.items.map((item, index) => {
    const active = index === activeIndex ? "active" : "";
    return (
      <React.Fragment key={index}>
        <div onClick={() => onTitleClick(index)} className={`title ${active}`}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p className="transition">{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{items}</div>;
};

export default Accordion;
