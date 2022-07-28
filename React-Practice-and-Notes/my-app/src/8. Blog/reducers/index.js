import { combineReducers } from "@reduxjs/toolkit";

const postsReducer = (state = [], action) => {
  if (action.type === 'FETCH_POST') {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  posts: postsReducer
})