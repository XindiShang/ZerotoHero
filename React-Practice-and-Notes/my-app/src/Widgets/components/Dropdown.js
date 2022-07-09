import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, handleSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    // In React 16, all events are registered at the topmost DOM node, which is the <html> tag.
    // So e.stopPropagation() won't work: If a nested tree has stopped propagation of an event, the outer tree would still receive it.
    // In React 17, the events are registered at the root DOM container where React tree is rendered.
    const onBodyClick = (e) => {
      // contains is the native method of the DOM
      if (ref.current.contains(e.target)) {
        return;
      }
      setOpen(false);
    }

    document.body.addEventListener('click', onBodyClick, { capture: true });

    // Clean up the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener('click', onBodyClick, { capture: true });
    }
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => handleSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label>Select a Color</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon" />
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
