import "./login.scss";
import { useRef, useContext } from "react";
import { login } from "../../api";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Faceybook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Faceybook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              ref={email}
              required
              placeholder="Email"
              type="email"
              className="loginInput"
            />
            <input
              ref={password}
              minLength="6"
              placeholder="Password"
              type="password"
              className="loginInput"
            />
            <button className="loginButton" disabled={isFetching} >{isFetching ? <CircularProgress sx={{ color: 'white' }} size="20px" /> : 'Log In'}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
