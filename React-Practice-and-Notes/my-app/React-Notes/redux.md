## Redux

### 1. Rules of Reducers

- Always return a new object, e.g. `[ ...state, ...newState ]`, NOT `state.push(newState)`; for deleting, use `state.filter(item => item.id !== id)`, instead of `state.splice(index, 1)`

### 2. Redux

- `{createStore, combineReducers}`
- In Redux, states are included in the reducers, along with the action.
  ![alt](./pictures/ReduxCycle.png)

### 3. React-Redux Library

#### 3.1 Provider (topmost of the hierarchy) -> App -> Connect => Component

```jsx
// index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./7. Songs/components/App";

import { Provider } from "react-redux";
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./7. Songs/reducers";

const store = configureStore({
  reducer: reducers,
});

// const store = createStore(reducers);

// Render the react component to the DOM
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

#### 3.2 `connect` is a function that takes a component and returns a new component.

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

class SongList extends Component {
  render() {
    // this.props === {songs: state.songs}
    return (
      <div className="ui container">
        <h1>SongList</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
  };
};

export default connect(mapStateToProps)(SongList);
```

#### 3.3 connect function under the hood

```jsx
import React from "react";

export const connect = (mapStateToProps) => {
  return (Comp) => {
    const state = {
      songs: [
        { title: "No Scrubs", duration: "4:05" },
        { title: "Macarena", duration: "2:30" },
        { title: "All Star", duration: "3:15" },
        { title: "I Want it That Way", duration: "1:45" },
      ],
      favoriteTitle: "All Star",
    };

    return (props) => {
      return <Comp {...props} {...mapStateToProps(state)} />;
    };
  };
};
```

### 4. Summary & Reflection

- connect function takes two arguments, first being the mapStateToProps function, and second being the actions to be passed to the component.

- A reducer is a combination of state and actions. It always returns a state, and will mutate the state based on different action types.

- Reducers can never return undefined.

- Why never mutate the state directly? because in redux source code, when state receives a change (e.g. has a different address in memory), it will inform all the subscribers to the store.

- use lodash's \_.omit() to remove the key/value pair from an object. Essentially, it creates a new object in the memory.

- `mapStateToProps(state, ownProps)`

### 5. Redux-Thunk

- actions must return a plain js object, instead of a promise(from async function);

```jsx
export const fetchPost = async () => {
  // This is a bad practice and will show error message in the console
  const response = await axios.get("/posts");

  return {
    type: "FETCH_POST",
  };
};
```

- Redux-Thunk can return either an action or a function. It's like calling dispatch 2 times. The first time, it dispatches a plain object (a function) and this async function calls an api and manually dispatches another action. The second time, the synchronous action gets dispatched, and moves on to the reducer stage.
  ![alt](./pictures/asyncMiddleware.png)
  ![alt](./pictures/reduxThunk.png)

```jsx
// redux-thunk behind the scnes
export const fetchPost = () => {
  return function (dispatch, getState) {
    const promise = axios.get("/posts");

    return {
      type: "FETCH_POST",
      payload: promise,
    };
  };
};
```

- RTK built-in thunk

```jsx
// index.js
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./8. Blog/reducers";
import axios from "./8. Blog/api/jsonPlaceholder";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: axios,
      },
    }),
});
```

```jsx
// actions/index.js
export const fetchPost = () => {
  // the extraArgument from configureStore is the 3rd argument
  return async function (dispatch, getState, api) {
    const response = await api.get("/posts");

    dispatch({ type: "FETCH_POST", payload: response });
  };
};
```

### 6. Memoization

- Memoization is a technique to cache the result of a function. In simpler words, it consists of storing in cache the output of a function, and making the function check if each required computation is in the cache before computing it. A cache is simply a temporary data store that holds data so that future requests for that data can be served faster.

- Lodash has a function called \_.memoize() that can be used to cache the result of a function. NOTE: the first argument of the memoized function is treated as the cached key, if a resolver isn't provided.

![alt](./pictures/LodashMemoize.png)

```jsx
// The issue with memoization
export const unMemoizedFetchUser = (id) => (dispatch, _getState, api) => {
  // This won't memoize successfully, because each time this action is created (fetching the user),
  // it will create a new memoize function in memory. What we want is the same memoize function each time action is created.
  return _.memoize(async (id, dispatch, api) => {
    const { data } = await api.get(`/users/${id}`);
    dispatch({
      type: "FETCH_USER",
      payload: data,
    });
  });
};
```

```jsx
// Solution 1
export const fetchUser = (id) => (dispatch, _getState, api) => {
  // Solution 1: define the memoize function outside of the action creator, so the memoize function is always at the same address in memory.
  // In other words, it's always gonna be the same function.
  _fetchUser(id, dispatch, api);
};

const _fetchUser = _.memoize(async (id, dispatch, api) => {
  const { data } = await api.get(`/users/${id}`);
  dispatch({
    type: "FETCH_USER",
    payload: data,
  });
});
```

```jsx
// Solution 2
// The downside of solution 1 is that the memoize function only update based on the cached key, which is the id.
// The logic of solution 2 is to first fetch all the data (posts and users), then find all unique ids, and call fetchUser one by one.
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // use dispatch here because redux-thunk will dispatch this function
  await dispatch(fetchPosts());
  // _.map(collection, property) returns the new array consists only of values of the given property
  // _.uniq(array) returns the new array consists only of unique values
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  // This time, we don't have to await because there aren't following actions
  userIds.forEach((id) => dispatch(fetchUser(id)));
};
```

```jsx
// Solution 2 refactored
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value(); // This is a MUST-DO step to make sure the chain is executed
}
```
