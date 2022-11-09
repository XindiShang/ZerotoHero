import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    "_id": "630e068df8b18d243bb1eb0e",
    "userName": "max",
    "email": "max@123.com",
    "profilePicture": "",
    "coverPicture": "",
    "followers": [],
    "following": [],
    "isAdmin": false,
    "city": "New York",
    "desc": "Well well well",
    "from": "Brooklyn",
    "relationship": 0,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{
      user: state.user,
      isFetching: state.isFetching,
      error: state.error,
      dispatch,
    }}>
      {children}
    </AuthContext.Provider>
  )
}