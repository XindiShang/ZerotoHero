import './register.scss';
import { useRef } from "react";
import request from "../../utils/request";
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        userName: userName.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await request.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className='register'>
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Faceybook</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Faceybook.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input placeholder="Username" required ref={userName} className="registerInput" />
            <input placeholder="Email" required ref={email} type="email" className="registerInput" />
            <input placeholder="Password" required ref={password} type="password" minLength={6} className="registerInput" />
            <input placeholder="Password Again" required ref={passwordAgain}  className="registerInput" />
            <button className="registerButton" type='submit'>Sign Up</button>
            <span className="registerForgot">Forgot Password?</span>
            <button className="registerRegisterButton">Log Into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
