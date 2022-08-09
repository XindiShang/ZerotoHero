// 1) Import the React and ReactDOM libraries
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./9. Stream/client/components/App";

import { Provider } from "react-redux";
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./9. Stream/client/reducers";
import axios from "./9. Stream/client/api/streams";

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      thunk: {
        extraArgument: axios
      }
    })
})

// const store = createStore(reducers);

// 2) Get a reference to the div with an id of "root"
const el = document.getElementById("root");

// 3) Tell React to take control of the root element
const root = createRoot(el);

// 4) Create a component
function Wrapper () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

// 5) Show the component on the screen
root.render(
  <Wrapper />
);
