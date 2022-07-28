import React from "react";
import { createRoot } from "react-dom/client";
import App from "./8. Blog/components/App";

import { Provider } from "react-redux";
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./8. Blog/reducers";
import axios from "./8. Blog/api/jsonPlaceholder";

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

// Render the react component to the DOM
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
