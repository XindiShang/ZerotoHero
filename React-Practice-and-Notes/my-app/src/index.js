import React from "react";
import { createRoot } from "react-dom/client";
import App from "./7. Songs/components/App";

import { Provider } from "react-redux";
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./7. Songs/reducers";

const store = configureStore({
  reducer: reducers,
})

// const store = createStore(reducers);

// Render the react component to the DOM
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
