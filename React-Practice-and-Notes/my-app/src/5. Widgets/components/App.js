import React, { useState } from "react";
import Accordion from "./Accordion";
import Search from "./Search";
import Dropdown from "./Dropdown";
import Translate from "./Translate";
import Route from "./Route";
import Header from "./Header";

// *** accordion ***
const items = [
  {
    title: "What is React?",
    content: "React is a JavaScript library for building user interfaces"
  },
  {
    title: "Why use React?",
    content: "React is a favorite among engineers"
  },
  {
    title: "How do you use React?",
    content: "You use React by creating components"
  }
]

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

const path = window.location.pathname;

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  const showComponent = () => {
    switch (path) {
      case "/":
        return <Accordion items={items} />;
      case "/search":
        return <Search />;
      case "/dropdown":
        return (
          <>
            <button onClick={() => setShowDropdown(!showDropdown)}>Toggle me!</button>
            {showDropdown ?
              <>
                <Dropdown
                  label="Select a Color"
                  selected={selected}
                  handleSelectedChange={setSelected}
                  options={options}
                />
                <p style={{ color: selected.value }}>The text is now {selected.value}.</p>
              </>
              : <p>Boo!</p>}
          </>
        )
      case "/translate":
        return <Translate />;
      default:
        return <div>Loading...</div>;
    }
  }

  return (
    <div>
      {/* <br /> */}
      {/* <Accordion items={items} /> */}
      {/* <Search /> */}
      {/* <Translate /> */}
      {/* {showComponent()} */}

      <Header />

      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <button onClick={() => setShowDropdown(!showDropdown)}>Toggle me!</button>
        {showDropdown ?
          <>
            <Dropdown
              label="Select a Color"
              selected={selected}
              handleSelectedChange={setSelected}
              options={options}
            />
            <p style={{ color: selected.value }}>The text is now {selected.value}.</p>
          </>
          : <p>Boo!</p>}
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>

      {/* <button onClick={() => setShowDropdown(!showDropdown)}>Toggle me!</button>
      {showDropdown ?
        <>
          <Dropdown
            label="Select a Color"
            selected={selected}
            handleSelectedChange={setSelected}
            options={options}
          />
          <p style={{ color: selected.value }}>The text is now {selected.value}.</p>
        </>
        : <p>Boo!</p>} */}

    </div>
  );
};

export default App;
