import React, { useState } from "react";
// import Accordion from "./Accordion";
// import Search from "./Search";
import Dropdown from "./Dropdown";

// *** accordion ***
// const items = [
//   {
//     title: "What is React?",
//     content: "React is a JavaScript library for building user interfaces"
//   },
//   {
//     title: "Why use React?",
//     content: "React is a favorite among engineers"
//   },
//   {
//     title: "How do you use React?",
//     content: "You use React by creating components"
//   }
// ]

// *** dropdown ***
const options = [
  {
    label: "The Color Red",
    value: "red",
  },
  {
    label: "The Color Green",
    value: "green",
  },
  {
    label: "A Shade of Blue",
    value: "blue",
  },
];

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      {/* <br /> */}
      {/* <Accordion items={items} /> */}
      {/* <Search /> */}
      <button onClick={() => setShowDropdown(!showDropdown)}>Toggle me!</button>
      {showDropdown ?
        <>
          <Dropdown
            selected={selected}
            handleSelectedChange={setSelected}
            options={options}
          />
          <p style={{ color: selected.value }}>The text is now {selected.value}.</p>
        </>
        : <p>Boo!</p>}

    </div>
  );
};

export default App;
